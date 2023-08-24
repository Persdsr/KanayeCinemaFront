from datetime import date

from django.db import models


class Career(models.Model):
    title = models.CharField(verbose_name='Название карьеры', max_length=12)

    def __str__(self):
        return self.title


class Actor(models.Model):
    name = models.CharField(verbose_name='ФИО', max_length=40)
    career = models.ManyToManyField(Career, verbose_name='Карьера', related_name='actor_careers')
    age = models.SmallIntegerField(verbose_name='Возраст', null=True, blank=True)
    birthday = models.DateField(verbose_name='День рождение', null=True, blank=True)
    place_of_birth = models.CharField(verbose_name='Место рождения', max_length=20, null=True, blank=True)
    avatar = models.ImageField(verbose_name='Аватарка', upload_to='directors_avatar/', null=True, blank=True)
    images = models.ManyToManyField('ActorImages', verbose_name='Фотографии актера', related_name='actor_images',
                                    blank=True)

    def __str__(self):
        return self.name


class ActorImages(models.Model):
    image = models.ImageField(verbose_name='Фотография', upload_to='actor_images/')

    def __str__(self):
        return self.image.url


class Genre(models.Model):
    title = models.CharField(verbose_name='Название', max_length=30)
    image = models.ImageField(verbose_name='Изображение', upload_to='genre_image/', null=True, blank=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(verbose_name='Название', max_length=30)
    image = models.ImageField(verbose_name='Изображение', upload_to='category_image/', null=True, blank=True)

    def __str__(self):
        return self.title


class Movie(models.Model):
    title = models.CharField(verbose_name="Название", max_length=100)
    tagline = models.CharField(verbose_name="Слоган", max_length=100, default='', null=True, blank=True)
    description = models.TextField(verbose_name="Описание", max_length=400, null=True, blank=True)
    poster = models.ImageField(verbose_name="Постер", upload_to="movies/", null=True, blank=True)
    year = models.DateField(verbose_name="Дата выхода", null=True, blank=True)
    country = models.CharField(verbose_name="Страна", max_length=30, null=True, blank=True)
    directors = models.ManyToManyField(Actor, verbose_name="Режиссеры", related_name="movie_directors", blank=True)
    actors = models.ManyToManyField(Actor, verbose_name="актеры", related_name="movie_actors", blank=True)
    genres = models.ManyToManyField(Genre, verbose_name="жанры", related_name='movie_genres', blank=True)
    world_premiere = models.DateField(verbose_name="Примьера в мире", default=date.today, null=True, blank=True)
    budget = models.PositiveIntegerField(verbose_name="Бюджет", default=0,
                                         help_text="указывать сумму в долларах", null=True, blank=True)
    fees_in_usa = models.PositiveIntegerField(
        verbose_name="Сборы в США", default=0, help_text="указывать сумму в долларах",
        null=True, blank=True
    )
    fees_in_world = models.PositiveIntegerField(
        verbose_name="Сборы в мире", default=0, help_text="указывать сумму в долларах",
        null=True, blank=True
    )
    category = models.ForeignKey(
        Category, verbose_name="Категория", on_delete=models.SET_NULL, related_name='movie_category', null=True,
        blank=True
    )
    url = models.SlugField(max_length=130, unique=True)
    draft = models.BooleanField(verbose_name="Публикация", default=True)

    def __str__(self):
        return self.title
