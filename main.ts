input.onButtonPressed(Button.A, function () {
    if (Paddle_a.get(LedSpriteProperty.X) > 0) {
        Paddle_a.change(LedSpriteProperty.X, -1)
        paddle_b.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (Paddle_a.get(LedSpriteProperty.X) < 3) {
        Paddle_a.change(LedSpriteProperty.X, 1)
        paddle_b.change(LedSpriteProperty.X, 1)
    }
})
let paddle_b: game.LedSprite = null
let Paddle_a: game.LedSprite = null
basic.showLeds(`
    . # # # .
    # . # . #
    # # # # #
    # # # # #
    # . # . #
    `)
basic.pause(1000)
basic.showString(" please wait")
music.playMelody("C5 G B A F A C5 B ", 120)
basic.showNumber(input.temperature())
Paddle_a = game.createSprite(2, 4)
paddle_b = game.createSprite(3, 4)
let ball = game.createSprite(randint(0, 4), 0)
let direction_x = 1
let direction_y = randint(-1, 1)
basic.pause(500)
basic.forever(function () {
    ball.change(LedSpriteProperty.X, direction_x)
    ball.change(LedSpriteProperty.Y, direction_y)
    if (ball.isTouching(Paddle_a) || ball.isTouching(paddle_b)) {
        ball.change(LedSpriteProperty.X, direction_x * -1)
        ball.change(LedSpriteProperty.Y, -1)
        direction_y = -1
        direction_x = randint(-1, 1)
    } else {
        if (ball.get(LedSpriteProperty.Y) <= 0) {
            direction_x = randint(-1, 1)
            direction_y = 1
        } else if (ball.get(LedSpriteProperty.Y) >= 4) {
            ball.set(LedSpriteProperty.Blink, 1)
            basic.pause(2000)
            game.gameOver()
        }
        if (ball.get(LedSpriteProperty.X) <= 0) {
            direction_x = 1
        } else if (ball.get(LedSpriteProperty.X) >= 4) {
            direction_x = -1
        }
        basic.pause(500)
    }
})
