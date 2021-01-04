from django.contrib import admin
from mainapp.models import User
from mainapp.models import Scores
from mainapp.models import AllSubjectQues
from mainapp.models import QuestionLogs
# Register your models here.

class Qlog(admin.ModelAdmin):
    readonly_fields = ('DateTime',)

admin.site.register(User)
admin.site.register(Scores)
admin.site.register(AllSubjectQues)
admin.site.register(QuestionLogs, Qlog)