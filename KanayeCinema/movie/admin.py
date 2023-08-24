from django.contrib import admin

from django.contrib import admin

from .models import Movie, Category, Genre, Actor, Career, ActorImages


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    pass


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    pass


@admin.register(ActorImages)
class ActorImagesAdmin(admin.ModelAdmin):
    pass
