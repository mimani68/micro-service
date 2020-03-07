
# Visual Studio Code

## Container remote setting

install remote debugger

    $ apt install gdb

### Test gdb

At this point, you should be able to run gdbserver on the remote machine and connect to it from your local gdb CLI. I’ll use the -L option of ssh to forward local port 9091 connections to the remote port 9091:

    local$ ssh -L9091:localhost:9091 user@remote
    remote$ cd ./myproject/ && make
    remote$ gdbserver :9091 ./myprogram

(Port 9091 is arbitrary; use any port number you like)

Leave that command running in a terminal window; it will wait until gdb connects before running ./myprogram .

In another terminal window on your local machine, run gdb:

    local$ gdb
    GNU gdb (GDB) 7.12
    Copyright (C) 2016 Free Software Foundation, Inc.
    ...
    For help, type "help".
    Type "apropos word" to search for commands related to "word".
    (gdb)

Then connect to the gdbserver instance:

    (gdb) target remote localhost:9091
    Remote debugging using localhost:9091
    ...
    (gdb)

To verify things are working, you can run various gdb commands like info sources , or set a breakpoint with break . Use continue to run ./myprogram .

## VsCode launch file

    {
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C++ Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceRoot}/build/micro-service",
            "miDebuggerServerAddress": "localhost:9091",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceRoot}",
            "sourceFileMap": { "/app": "${workspaceFolder}" },
            "environment": [],
            "externalConsole": false,
            "linux": {
                "MIMode": "gdb",
                "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
                ]
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb",
                "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
                ]
            }
        }
    ]


Refrence

* https://stackoverflow.com/questions/51433937/how-to-compile-debug-a-c-application-in-docker-with-visual-studio-code-on-wind

* https://medium.com/@spe_/debugging-c-c-programs-remotely-using-visual-studio-code-and-gdbserver-559d3434fb78