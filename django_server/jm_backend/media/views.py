# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
import json
import StringIO
from PIL import Image

from rest_framework.authtoken import views

# Create your views here.

from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from media.models import MediaImage, Album
from media.serializers import MediaImageSerializer, AlbumSerializer


class MediaImagesViewSet(viewsets.ModelViewSet):
    queryset = MediaImage.objects.all()
    serializer_class = MediaImageSerializer
    parser_classes = (MultiPartParser, FormParser,)
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()
        for img in self.request.data.getlist('image'):
            if img != serializer.validated_data['image']:
                MediaImage.objects.create(image=img)


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

# FROM TORNADO SERVER
# class ImageHandler(BaseHandler):
#     def get(self):
#         try:
#             MEDIA_ROOT = os.path.abspath(os.path.dirname("/var/www/media/"))
#             imgTag = self.get_argument("imgTag")
#             imgDict = {}
#             if imgTag == "all":
#                 i = 0
#                 for file in os.listdir(MEDIA_ROOT):
#                     if file.lower().endswith(('.png', '.jpg', '.jpeg')):
#                         imgDict[i] = file
#                         i += 1
#                 self.write(json.dumps(imgDict))
#         except Exception as e:
#             self.write({"error": "Error in retreiving images"})
#             pass
#
# class UploadHandler(BaseHandler):
#     def post(self):
#         VALID_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"]
#         # print self.request.files['images'][0]
#         files = []
#         msgType = "None"
#         msg = "Nothing happened "
#         try:
#             files = self.request.files['images']
#         except Exception as e:
#             self.write({"error": "Error in retreiving images"})
#             return
#         for tempFile in files:
#             # get file name
#             file = tempFile['filename']
#             # the filename should not contain any characters to go to another directory
#             index = file.rfind(".")
#             filename = file[:index].replace(".", "") +  file[index:]
#             filename = filename.replace("/", "")
#             if any([filename.lower().endswith(e) for e in VALID_IMAGE_EXTENSIONS]):
#                 # compress and resize image
#                 try:
#                     path = handle_uploaded_image_with_dimensions(filename, tempFile['body'])
#                     print path
#                     msgType = "success"
#                     msg = "The file(s) were successfully uploaded"
#                 except Exception as e:
#                     msgType = "error"
#                     msg = repr(e)
#                     break
#             else:
#                 msgType = "error"
#                 msg = "The file " + str(filename) + " is not an image "
#                 break
#         self.write({msgType: msg})
#         pass
#
# def handle_uploaded_image_with_dimensions(filename, imageFile):
#     """Upload image with different dimensions."""
#     # Dimensions are 4:3 ratio standard
#     DIMENSIONS = [(0.0, 960, "/img-lg"), (0.0, 600, "/img-md"), (0.0, 360, "/img-sm"), (0.0, 200, "/img-xs"),
#                   (None, None, "")]
#     IMAGE_DIR = "/var/www/media"
#     for width, height, url in DIMENSIONS:
#         path = handle_uploaded_image(
#             IMAGE_DIR + str(url),
#             filename,
#             imageFile,
#             width=width,
#             height=height)
#     return path
#
# def handle_uploaded_image(save_to, image_name, image_file, width=None, height=None):
#     # todo throw exception if path isn't available
#     if not os.path.exists(save_to):
#         os.makedirs(save_to)
#
#     # re-initialize imageFile and set a hash (unique filename)
#     # convert to JPEG
#     index = image_name.rfind(".")
#     filename = image_name[:index] + ".jpg"
#
#     # if file already exists
#     if os.path.exists(os.path.join(save_to, filename)):
#         raise OSError("The following image already exists: " + str(filename))
#
#     # create PIL Image instance
#     imagefile = StringIO.StringIO(image_file)
#     image = Image.open(imagefile)
#
#     # when width and height not specified, reduce image quality and save
#     if width is None or height is None:
#         imagefile = open(os.path.join(save_to, filename), 'w')
#         image.save(imagefile, "JPEG", optimize=True, quality=80)
#         return filename
#
#     # if not RGB, convert
#     if image.mode not in ("L", "RGB"):
#         image = image.convert("RGB")
#
#     # get original image ratio
#     img_ratio = float(image.size[0]) / image.size[1]
#
#     # resize but constrain proportions?
#     if width == 0.0:
#         width = height * img_ratio
#     elif height == 0.0:
#         height = width * img_ratio
#
#     # output file ratio
#     resize_ratio = float(width) / height
#     width = int(width)
#     height = int(height)
#
#     '''Cropping
#     # get output width and height to do the first crop
#     if (img_ratio > resize_ratio):
#         output_width = width * image.size[1] / height
#         output_height = image.size[1]
#         originX = image.size[0] / 2 - output_width / 2
#         originY = 0
#     else:
#         output_width = image.size[0]
#         output_height = height * image.size[0] / width
#         originX = 0
#         originY = image.size[1] / 2 - output_height / 2
#
#     # crop
#     #cropBox = (originX, originY, originX + output_width, originY + output_height)
#     #image = image.crop(cropBox)
#     '''
#
#     # resize (doing a thumb)
#     # image.thumbnail([width, height], Image.ANTIALIAS)
#     image = image.resize((width, height), Image.ANTIALIAS)
#
#     # save to disk
#     imagefile = open(os.path.join(save_to, filename), 'w')
#     image.save(imagefile, "JPEG", optimize=True, quality=80)
#
#     return filename

