#!/usr/bin/python

import os
import logging
import tornado.ioloop
import tornado.web
import tornado.autoreload
from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)
define("log_name", default="jd_log", help="name of the logfile")

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", IndexHandler),
        ]

        self.options = options
        #logger = logging.getLogger(options.log_name)
        #logger.setLevel(logging.DEBUG)
        #fh = logging.FileHandler("etc/logs/"+options.log_name+".log")
        #fh.setLevel(logging.DEBUG)
        #formatter = logging.Formatter("{'timestamp': %(asctime)s, 'loglevel' : %(levelname)s %(message)s }")
        #fh.setFormatter(formatter)
        #logger.addHandler(fh)
        tornado.web.Application.__init__(self, handlers)
        #logger.info("Application started on port " + str(options.port))

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world! How are you today?")
        self.write("Hello, world! How are you today?")

if __name__ == "__main__":
    io_loop = tornado.ioloop.IOLoop.instance()
    application = Application()
    application.listen(options.port)
    tornado.autoreload.start()
    io_loop.start()
