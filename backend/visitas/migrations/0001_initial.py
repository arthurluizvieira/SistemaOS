# Generated by Django 5.0.7 on 2025-05-20 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Visitas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Data', models.CharField(max_length=100)),
                ('Empresa', models.CharField(max_length=50)),
                ('Visitante', models.CharField(max_length=100)),
            ],
        ),
    ]
