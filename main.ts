// id: 0 ->  Left motor, 1 -> Right motor, 2 -> Both Right and Left motor
// dir: 0 -> forward, 1 -> backword
// speed: 0~255 (PWM value control motor speed)
function motorun (id: number, dir: number, speed: number) {
    mcu_i2c_addr = 16
    let i2cbuf = pins.createBuffer(3)
if (id == 0) {
        i2cbuf[0] = 0
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_i2c_addr, i2cbuf)
    }
    if (id == 1) {
        i2cbuf[0] = 2
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_i2c_addr, i2cbuf)
    }
    if (id == 2) {
        i2cbuf[0] = 0
        i2cbuf[1] = dir
        i2cbuf[2] = speed
        pins.i2cWriteBuffer(mcu_i2c_addr, i2cbuf)
i2cbuf[0] = 2
        pins.i2cWriteBuffer(mcu_i2c_addr, i2cbuf)
    }
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
let mcu_i2c_addr = 0