# Generated by Django 4.2.13 on 2025-05-21 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='OrdemDeServico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nome', models.CharField(max_length=100)),
                ('Visitante', models.CharField(max_length=50)),
                ('Empresa', models.CharField(max_length=100)),
            ],
        ),
    ]
