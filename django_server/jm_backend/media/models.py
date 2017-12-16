# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.db import models
from django.conf import settings

from PIL import Image

# Create your models here.
from django.utils import timezone


def uploaded_filename(instance, filename, prefix="", image_id=0):
    extension = filename.split(".")[-1]
    image_id = instance.id if instance.id is not None else image_id
    return "media/{}{}.{}".format(prefix, image_id, extension)


def create_thumbnail(image_id, input_image, thumbnail_size=(256, 256)):
    """
    Create a thumbnail of an existing image
    :param input_image:
    :param thumbnail_size:
    :return:
    """
    # make sure an image has been set
    if not input_image or input_image == "":
        return

    # open image
    image = Image.open(input_image)

    # use PILs thumbnail method; use anti aliasing to make the scaled picture look good
    image.thumbnail(thumbnail_size, Image.ANTIALIAS)

    # parse the filename and scramble it
    filename = uploaded_filename(None, os.path.basename(input_image.name), "thumb/", image_id)
    arrdata = filename.split(".")
    # extension is in the last element, pop it
    extension = arrdata.pop()
    basename = "".join(arrdata)
    # add _thumb to the filename
    new_filename = basename + "_thumb." + extension

    # save the image in MEDIA_ROOT and return the filename
    image.save(os.path.join(settings.MEDIA_ROOT, new_filename))

    return new_filename


class MediaImage(models.Model):
    image = models.ImageField("Uploaded image", upload_to=uploaded_filename)
    thumbnail = models.ImageField("Thumbnail of uploaded image", blank=True)
    title = models.CharField("Title of the uploaded image", max_length=255, default="Unknown Picture")
    description = models.TextField("Description of the uploaded image", default="")
    favorite = models.BooleanField("Image that is a favorite", default=False)
    date_created = models.DateTimeField("Date image was created", default=timezone.now)

    def __str__(self):
        return self.title

    def save(self, force_update=False):
        # generate and set thumbnail or none
        self.thumbnail = create_thumbnail(self.id, self.image)

        # force update as we just changed something
        super(MediaImage, self).save(force_update=force_update)

    class Meta:
        ordering = ('date_created',)


class Album(models.Model):
    title = models.CharField("Title of the album", max_length=255, default="Unknown Album")
    description = models.TextField("Description of the album", default="")
    photos = models.ManyToManyField(MediaImage)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)

