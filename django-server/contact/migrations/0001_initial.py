# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-01-17 05:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BridalShower',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_attending', models.PositiveSmallIntegerField(default=0, verbose_name='number of attendants')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name of person')),
                ('phone', models.CharField(max_length=10, verbose_name='Phone number')),
            ],
        ),
        migrations.CreateModel(
            name='Wedding',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_attending', models.PositiveSmallIntegerField(default=0, verbose_name='number of attendants')),
                ('attendants', models.ManyToManyField(to='contact.Person', verbose_name='list of attendees')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='bridalshower',
            name='attendants',
            field=models.ManyToManyField(to='contact.Person', verbose_name='list of attendees'),
        ),
    ]
