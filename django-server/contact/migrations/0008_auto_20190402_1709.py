# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-04-02 17:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0007_auto_20190329_0425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='name',
            field=models.CharField(max_length=512, verbose_name='Name of person'),
        ),
    ]
