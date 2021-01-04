from django.db import models

# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=128)
    password =  models.CharField(max_length=8)
    assessment_count = models.IntegerField(default=0)
    last_assessment_score = models.IntegerField(default=None)

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=2000)
    complexity = models.CharField(choices=[
        ("S","Simple"),
        ("M","Medium"),
        ("D","Difficult"),
    ], max_length=30)
    options = models.CharField(max_length=1000)
    correct_answer = models.CharField(max_length=100)


class Scores(models.Model):
     user_id = models.ForeignKey(User, on_delete=models.CASCADE)
     attempt_number = models.IntegerField(default=1)
     score = models.IntegerField()



class EasyQuestion(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=2000)
    options = models.CharField(max_length=1000)
    correct_answer = models.CharField(max_length=100)

class MediumQuestion(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=2000)
    options = models.CharField(max_length=1000)
    correct_answer = models.CharField(max_length=100)

class DifficultQuestion(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=2000)
    options = models.CharField(max_length=1000)
    correct_answer = models.CharField(max_length=100)

class AllSubjectQues(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=2000)
    complexity = models.CharField(choices=[
        ("S","Simple"),
        ("M","Medium"),
        ("D","Difficult"),
    ], max_length=30)
    subject = models.CharField(choices=[
        ("C++","C++"),
        ("Java","Java"),
        ("C","C"),
    ], max_length=30)
    options = models.CharField(max_length=1000)
    correct_answer = models.CharField(max_length=100)

class QALog(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    question_id = models.ForeignKey(AllSubjectQues, on_delete=models.CASCADE)
    response = models.CharField(max_length=100)
    DateTime = models.DateTimeField(auto_now=True)


class QuestionLogs(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    question_id = models.ForeignKey(AllSubjectQues, on_delete=models.CASCADE)
    response = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    DateTime = models.DateTimeField(auto_now=True)

