#!/usr/bin/python

import os
import logging
import tornado.ioloop
import tornado.web
import tornado.autoreload
from tornado.options import define, options

# import handlers as needed - here we import all of them
from delion.base_handlers import *
#from delion.route_handlers import *

define("port", default=8888, help="run on the given port", type=int)
define("log_name", default="jd_log", help="name of the logfile")

#the main class the wraps everything up
class Application(tornado.web.Application):
    def __init__(self):
        # list out the routes as regex and their corresponding handlers
        handlers = [
            (r"/images", ImageHandler),
            (r"/", BaseIndexHandler),
        ]

        #setup information for logging and etc.
        self.options = options
        logger = logging.getLogger(options.log_name)
        logger.setLevel(logging.DEBUG)
        fh = logging.FileHandler("etc/logs/"+options.log_name+".log")
        fh.setLevel(logging.DEBUG)
        formatter = logging.Formatter("{'timestamp': %(asctime)s, 'loglevel' : %(levelname)s %(message)s }")
        fh.setFormatter(formatter)
        logger.addHandler(fh)
        tornado.web.Application.__init__(self, handlers)
        logger.info("Application started on port " + str(options.port))

if __name__ == "__main__":
    #initiate the IO loop for Tornado
    io_loop = tornado.ioloop.IOLoop.instance()
    # create a new intance of the Application
    application = Application()
    application.listen(options.port)
    # autoreload if anything changes
    tornado.autoreload.start()
    io_loop.start()
