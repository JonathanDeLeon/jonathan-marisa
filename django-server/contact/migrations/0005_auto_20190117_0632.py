# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-01-17 06:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0004_auto_20190117_0625'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='attending',
            field=models.BooleanField(default=True, verbose_name='If group is attending'),
        ),
    ]
