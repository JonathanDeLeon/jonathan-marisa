# base_handlers.py

import tornado.web
import logging
import requests
import json
import time
import datetime
import hmac
import base64
import hashlib
import glob, os

# this is the root/base handler for all other handlers
class BaseHandler(tornado.web.RequestHandler):
    # newer JS frameworks send an OPTIONS request as a "preflight" to check if the server is safe
    # this just tells the framework that it is safe to send data here
    def options(self, *path_args, **path_kwargs):
        self.set_header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, token")
        pass

    # allow data to come from anywhere
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def prepare(self):
        # some modern JS frameworks force data to be sent as JSON
        # this isn't a bad thing at all, just requires us to "prepare" the data before it's used internally
        if "Content-Type" in self.request.headers and self.request.headers["Content-Type"].startswith("application/json") and len(self.request.arguments) == 0:
            try:
                json_data = json.loads(self.request.body)
                self.request.arguments = json_data
            except Exception as e:
                pass

# effectively useless, but at least provides an endpoint for people accessing "/" by accident
class BaseIndexHandler(BaseHandler):
    def get(self):
        print "In the BaseIndex"
        self.write("Hello, world! How are you today?")

class ImageHandler(BaseHandler):
    def get(self):
        print "In Image Handler"
        try:
            imgTag = self.get_argument("imgTag")
            imgDict = {}
            if imgTag == "all":
                print "In imgTag"
                i = 0
                for file in os.listdir("/var/www/html/johndelion.com/media"):
                    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                        imgDict[i] = file
                        i += 1
                self.write(json.dumps(imgDict))
        except Exception as e:
            self.write({"error": "Error in retreiving images"})
            pass
            
