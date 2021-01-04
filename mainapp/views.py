from django.shortcuts import render
from mainapp.models import User,AllSubjectQues as ques, QuestionLogs as qlog, Scores
from django.http import HttpResponse
from django.http import JsonResponse
import random


import json
# Create your views here.

def findUser(Usertable, email, password):
    userid = -1
    username=""
    try:
        user = Usertable.objects.filter(email=email)[0]
        if user.password == password:
            result = "Success"
            status=2
            userid = user.id
            username = user.username
        else:
            result = "Invalid Password"
            status=1
    except:
        result = "No Such User Exists!"
        status=0
    return  {"response":result,"status":status,"userid":userid, "username":username}

def loginModule(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        email = body_data["email"]
        password = body_data["password"]
        result = findUser(User, email, password)
    return JsonResponse(result)

def getPaper(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        subject = body_data["subject"]
    result={}
    
    try:
        status = 1 
        simple = ques.objects.filter(complexity="S",subject=subject)
        medium = ques.objects.filter(complexity="M",subject=subject)
        difficult = ques.objects.filter(complexity="D",subject=subject)
        
        rand_simple, rand_medium, rand_difficult = [], [], []
        while(len(rand_simple)!=2):
            num = random.randint(0,len(simple)-1)
            if num not in rand_simple:
                rand_simple.append(num)
        while(len(rand_medium)!=6):
            num = random.randint(0,len(medium)-1)
            if num not in rand_medium:
                rand_medium.append(num)
        while(len(rand_difficult)!=2):
            num = random.randint(0,len(difficult)-1)
            if num not in rand_difficult:
                rand_difficult.append(num)
        final=[]
        
        for i in range(2):        
            question = simple[rand_simple[i-1]].question
            options = simple[rand_simple[i-1]].options.split("`*`")
            qid = simple[rand_simple[i-1]].question_id
            final.append((qid, question, options))
        for i in range(6):        
            question = medium[rand_medium[i-1]].question
            options = medium[rand_medium[i-1]].options.split("`*`")
            qid = medium[rand_medium[i-1]].question_id
            final.append((qid, question, options))
        for i in range(2):        
            question = difficult[rand_difficult[i-1]].question
            options = difficult[rand_difficult[i-1]].options.split("`*`")
            qid = difficult[rand_difficult[i-1]].question_id
            final.append((qid, question, options))
            
        result = {"result":final, "subject":subject}
    except:
        status=0
    result["status"] = status

    return JsonResponse(result)
def complexity(c):
    if c=="S":
        score = 5
    elif c=="M":
        score = 10
    elif c=="D":
        score = 15
    return score

def testSubmit(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        responses = body_data["data"]
        userid = body_data["userid"]
        score = 0
        metrics = []
        userobj = User.objects.filter(id=userid)[0]
        last_assessment_Score = User.objects.filter(id=userid)[0].last_assessment_score
        for qid,answer in responses.items():
            qid = int(qid)
            question = ques.objects.filter(question_id=qid)[0]
            if(question.correct_answer==answer):
                score += complexity(question.complexity)
                question_response = "correct"
                current_score = complexity(question.complexity)
            else:
                question_response = "incorrect"
                current_score  = 0 
            metrics.append([question.question,question.complexity,answer,question.correct_answer,question_response,current_score])
            quesobj = ques.objects.filter(question_id=qid)[0]
            saveLog = qlog(user_id=userobj, question_id= quesobj, response= answer, status=question_response)
            saveLog.save()
        print(score)
        last_attemp_count = len(Scores.objects.filter(user_id=userid))
        saveResult = Scores(user_id=userobj, attempt_number= last_attemp_count+1, score=score)
        saveResult.save()


        User.objects.filter(id=userid).update(assessment_count=last_attemp_count+1, last_assessment_score=score)
    
    result={"status":"OK", "score":score, "metric":metrics, "lastScore":last_assessment_Score}
    print(metrics)
    return JsonResponse(result)
