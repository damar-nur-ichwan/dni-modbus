
const modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
let y;
function Modbus(host,port,slaveId,modbusAddress,functionCode,quantity){
const options = {host, port}
const client = new modbus.client.TCP(socket, slaveId)
const x = socket.on('connect', function(){
        if(functionCode === 1){
        y = client.readCoils(modbusAddress,quantity)
        } else if (functionCode === 2){
        y = client.readDiscreteInputs(modbusAddress,quantity)
        } else if (functionCode === 3){
        y = client.readHoldingRegisters(modbusAddress,quantity)
        } else if (functionCode === 4){
        y = client.readInputRegisters(modbusAddress,quantity)
        } 
        y.then(function(res){
            myData = res.response._body._values[0]
            return myData // output data
        }). catch(function(){
            console.error(arguments) 
            socket.end()
        })
        return y
})
socket.on('error',console.error)
socket.connect(options)
return x;
}
module.exports = Modbus

//***********************************************************/
// const host = '192.168.1.111', 
// port = 502, 
// slaveId = 1,
// modbusAddress = 0,
// quantity = 2,
// pollRate = 1000; //dalam 'ms'
//***********************************************************/