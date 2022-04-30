/* eslint-disable no-unused-vars */
/*
   Copyright 2018 Makoto Consulting Group, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

//* **********************************************************
//* simple-logger                                           *
//* To use this class, require() it and access one of       *
//* its helper functions to log output from your            *
//* JavaScript code. Call the function that corresponds     *
//* to the level of granularity that you want. The message  *
//* will appear if its Level is >= the current log level    *
//* (default: INFO). Standard logging stuff. No surprises.  *
//*                                                         *
//* trace() - log a trace message (finest granularity)      *
//* debug()                                                 *
//* info()                                                  *
//* warn()                                                  *
//* error()                                                 *
//* fatal() - log a fatal message (coarsest granularity)    *
//*                                                         *
//* setLogLevel() - sets the log level to the specified     *
//* Level.                                                  *
//* Setting the LogLevel to Level.OFF turns off logging.    *
//* **********************************************************
//*
//*
interface ILevelData {
  priority: number;
  outputString: string;
  textColor: string;
}

interface ILevel {
  TRACE: ILevelData;
  DEBUG: ILevelData;
  INFO: ILevelData;
  WARN: ILevelData;
  ERROR: ILevelData;
  FATAL: ILevelData;
  OFF: ILevelData;
}

const Level: ILevel = {
  TRACE: { priority: 0, outputString: "TRACE", textColor: "\x1b[34m" },
  DEBUG: { priority: 100, outputString: "DEBUG", textColor: "\x1b[35m" },
  INFO: { priority: 200, outputString: "INFO", textColor: "\x1b[36m%s\x1b[0m" },
  WARN: {
    priority: 300,
    outputString: "WARN",
    textColor: "\x1b[93m",
  },
  ERROR: { priority: 400, outputString: "ERROR", textColor: "\x1b[31m" },
  FATAL: {
    priority: 500,
    outputString: "FATAL",
    textColor: "\x1b[91m;",
  },
  OFF: { priority: 1000, outputString: "OFF", textColor: "\x1b[37m" },
};
let logLevel = Level.INFO;
// console.log('Current log level: priority => ' + logLevel.priority + ', outputString => ' + logLevel.outputString);

// Output only the message (or include other decorations)
let decorateOutputMessage = true;
function setDecorateOutputMessage(value: any) {
  decorateOutputMessage = value;
}

/**
 * This function logs a message, along with the elapsed time.
 * Assumptions:
 * - The startTime has been created somewhere upstream
 *
 * @param message - the Message to be logged. Required.
 *
 * @param source - the source of the message. What that means is really
 * up to the one who defines the message. It could mean, for example, the
 * function within which the message originated.
 * Optional. If not set, just the message passed in is logged.
 */
function log(messageLogLevel: ILevelData, message: string, source: string) {
  // console.log('Current log level: ' + logLevel.outputString);
  if (messageLogLevel.priority >= logLevel.priority) {
    let computedMessage = message.toString();
    if (decorateOutputMessage === true) {
      // Compute the message text based on log level output string, and whether
      /// or not the startTime was present
      const now = new Date(Date.now()).toUTCString();
      const outputString = `${now.toString()}:${messageLogLevel.outputString}`;
      computedMessage = `${outputString}: ${
        source ? `${source}: ` : ""
      }${message}`;
      // Now log the computed message
    }
    console.log(messageLogLevel.textColor, computedMessage);
  }
}

/**
 * Allows dependent module to mutate the log level
 */
function setLogLevel(newLevel: ILevelData) {
  logLevel = newLevel;
}

function setMessageOnlyOutput(value: string) {
  const messageOnlyOutput = value;
}

/**
 * Helper function - TRACE level messages
 */
function trace(message: any, source: string) {
  log(Level.TRACE, message, source);
}

/**
 * Helper function - DEBUG level messages
 */
function debug(message: string, source: string) {
  log(Level.DEBUG, message, source);
}

/**
 * Helper function - INFO level messages
 */
function info(message: string, source: string) {
  log(Level.INFO, message, source);
}

/**
 * Helper function - WARN messages
 */
function warn(message: string, source: string) {
  log(Level.WARN, message, source);
}

/**
 * Helper function - ERROR messages
 */
function error(message: string, source: string) {
  log(Level.ERROR, message, source);
}

/**
 * Helper function - FATAL messages
 */
function fatal(message: string, source: string) {
  log(Level.FATAL, message, source);
}

export default {
  Level,
  setLogLevel,
  setMessageOnlyOutput,
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
};
