# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
import uuid

from datetime import date

import cloudinary.uploader
import cloudinary.api
from cloudinary.models import CloudinaryField
from django.db import models
from django.conf import settings

from PIL import Image

# Create your models here.


def uploaded_filename(instance, filename, prefix="img/"):
    id = instance.uuid if instance is not None and not isinstance(instance, uuid.UUID) else instance
    extension = filename.split(".")[-1]
    return "media/{}{}.{}".format(prefix, id, extension)


def create_thumbnail(input_image, uuid, thumbnail_size=(0.0, 256)):
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

    # if not RGB, convert
    if image.mode not in ("L", "RGB"):
        image = image.convert("RGB")

    # get original image ratio
    img_ratio = float(image.size[0]) / image.size[1]

    width = thumbnail_size[0]
    height = thumbnail_size[1]

    # resize but constrain proportions?
    if width == 0.0:
        width = height * img_ratio
    elif height == 0.0:
        height = width * img_ratio

    # output file ratio
    width = int(width)
    height = int(height)

    # use PILs thumbnail method; use anti aliasing to make the scaled picture look good
    # image = image.resize((width, height), Image.ANTIALIAS)
    image.thumbnail((width, height), Image.ANTIALIAS)

    # parse the filename and scramble it
    filename = uploaded_filename(uuid, os.path.basename(input_image.name), "thumb/")
    arrdata = filename.split(".")
    # extension is in the last element, pop it
    extension = arrdata.pop()
    basename = "".join(arrdata)
    # add _thumb to the filename
    new_filename = basename + "_thumb." + extension

    # save the image in MEDIA_ROOT and return the filename
    image.save(os.path.join(settings.MEDIA_ROOT, new_filename), "JPEG", optimize=True, quality=80)

    return new_filename


class MediaImage(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    image = models.ImageField("Uploaded image", upload_to=uploaded_filename)
    thumbnail = models.URLField("Thumbnail of uploaded image", blank=True)
    description = models.TextField("Description of the uploaded image", default="", blank=True)
    favorite = models.BooleanField("Image that is a favorite", default=False)
    date_created = models.DateField("Date image was created", default=date.today)

    def __str__(self):
        return self.image.name

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        # generate and set thumbnail or none
        # if not self.thumbnail:
        #     self.thumbnail = create_thumbnail(self.image, self.uuid)
        # force update as we just changed something
        if not self.thumbnail:
            arr = cloudinary.uploader.upload(
                self.image,
                public_id = str(self.uuid)
            )
            self.thumbnail = arr['secure_url']
        super(MediaImage, self).save(force_update=force_update)

    class Meta:
        ordering = ('date_created',)


class Album(models.Model):
    title = models.CharField("Title of the album", max_length=255, default="Unknown Album")
    priority = models.PositiveSmallIntegerField("Album ordinal", default=1)
    photos = models.ManyToManyField(MediaImage, related_name="albums")
    cover = models.URLField("Album cover photo", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)
