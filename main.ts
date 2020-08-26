let mcu_addr = 0x16

// id: 0 ->  Left motor, 1 -> Right motor, 2 -> Both Right and Left motor
// dir: 0 -> forward, 1 -> backword
// speed: 0~255 (PWM value control motor speed)
function motorun (id: number, dir: number, speed: number) {
    let i2cbuf = pins.createBuffer(3)
    if (id == 0) {
        i2cbuf[0] = 0
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_addr, i2cbuf)
    }
    if (id == 1) {
        i2cbuf[0] = 2
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_addr, i2cbuf)
    }
    if (id == 2) {
        i2cbuf[0] = 0
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_addr, i2cbuf)
        i2cbuf[0] = 2
        pins.i2cWriteBuffer(mcu_addr, i2cbuf)
    }
}

// Read IR sensor's value. SensorIDs+3 = IR sensor ID 
// (IR0->0x03, IR1->0x04, IR2->0x05, IR3->0x06, IR4->0x07)
function readIR(SensorIDs: number): number {
    pins.i2cWriteNumber(
        mcu_addr, 
        SensorIDs + 3, 
        NumberFormat.Int8LE,
        false 
    )
    return pins.i2cReadNumber(mcu_addr, NumberFormat.UInt16BE, false)
}



input.onButtonPressed(Button.A, function () {
    motorun(0, 1, 50)
})
input.onButtonPressed(Button.AB, function () {
    motorun(0, 0, 0)
})
input.onButtonPressed(Button.B, function () {
    motorun(0, 0, 50)
})


