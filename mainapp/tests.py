import unittest 
from mainapp import views
from mainapp.models import User,AllSubjectQues as ques, QuestionLogs as qlog, Scores

class loginTestCase(unittest.TestCase):
    def setUp(self):
        self.email= "deepak@xoriant.com"
        self.password = '1234'
    def testLogin(self):
        self.assertEqual(views.findUser(User, self.email, self.password),{"response":"Success","status":2,"userid":2, "username":"Xor_Deepak"})
    def testLogin2(self):
        self.assertEqual(views.findUser(User, self.email, ""),{"response":"Success","status":2,"userid":2, "username":"Xor_Deepak"})
    def testLogin3(self):
        self.assertEqual(views.findUser(User, "deepak@XORIANT.com", self.password),{"response":"Success","status":2,"userid":2, "username":"Xor_Deepak"})
    def testLogin4(self):
        self.assertEqual(views.findUser(User, self.email, self.password),{"response":"Invalid Password","status":1,"userid":-1, "username":""})

class ComplexityCheck(unittest.TestCase):
    def testUserLogin(self):
        self.assertEqual(views.complexity("S"),  5)
    def testcomplexitymed(self):
        self.assertEqual(views.complexity("M"),  10)
    def testcomplexitydif(self):
        self.assertEqual(views.complexity("D"),  15)
    def testcomplexitydif2(self):
        self.assertEqual(views.complexity("D"),  "15")
   