# Membrane

## Installation

Download membrane at https://github.com/membrane/api-gateway/releases/latest.  
Unzip it in a folder called `membrane`.

## Configuration

Add the following file content:

```xml
<!-- conf/proxies.xml -->
<router>
    <api host="localhost" port="8001">
        <target host="localhost" port="3001"/>
    </api>
    <api port="8002">
        <webSocket/>
        <regExReplacer regex="localhost:3001" replace="localhost:8001"/>
        <regExReplacer regex="localhost:3000" replace="localhost:8002"/>
        <regExReplacer regex="port=3000" replace="port=8002"/>
        <target host="localhost" port="3000"/>
    </api>
    <api name="Console" port="9001">
        <adminConsole/>
    </api>
</router>
```

## Start

```bash
cd membrane
./service-proxy.sh
```

The membrane admin console will be at http://localhost:9001/admin/.

# Server

```bash
cd sse-server
npm install
node server.js
```

# Client

```bash
cd sse-client
```

And open the `index.html` in your browser.

You can watch the calls at http://localhost:9001/admin/calls/.
