/**
 * Created by Owlz on 23/09/2018.
 */

import Entity3D from "./Entity3D";
import Camera from "./Camera";

export default class Player extends Entity3D {
    constructor(map) {
        super();

        this.moveXState = -1;
        this.moveYState = -1;
        // this.rotState = -1;

        this.STATE_MOVE_X = {
            NONE: 0,
            FORWARD: 1,
            BACK: 2,
        };

        this.STATE_MOVE_Y = {
            NONE: 0,
            LEFT: 1,
            RIGHT: 2
        };

        // this.STATE_ROT = {
        //     NONE: 0,
        //     LEFT: 1,
        //     RIGHT: 2
        // };

        /**
         * @type {Map}
         * @private
         */
        this._map = map;

        /**
         * @type {Camera}
         * @private
         */
        this._camera = new Camera(map, this);

        /**
         * Players world position
         * @type {PIXI.Point}
         * @private
         */
        this._position = new PIXI.Point(1, 3.5);

        /**
         * Player / Camera facing direction
         * @type {PIXI.Point}
         * @private
         */
        this._dir = this._camera.direction;

        /**
         * @type {number}
         * @private
         */
        this._moveSpeed = 0.4;

        /**
         * @type {number}
         * @private
         */
        this._rotSpeed = 0.2;

        /**
         * @type {number}
         * @private
         */
        this._yAdjust = 1;

        //--rotate to desired start rotation--//
        this.rotate(Math.PI);

        //bind events
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        document.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    // When user starts pressing down the key
    onKeyDown(e) {
        if (e.keyCode === 87) {
            this.stateMoveX = this.STATE_MOVE_X.FORWARD;
        }
        else if (e.keyCode === 83) {
            this.stateMoveX = this.STATE_MOVE_X.BACK;
        }
        else if (e.keyCode === 65) {
            this.stateMoveY = this.STATE_MOVE_Y.LEFT;
        }
        else if (e.keyCode === 68) {
            this.stateMoveY = this.STATE_MOVE_Y.RIGHT;
        }
        // else if (e.keyCode === 65) {
        //     this.rotState = this.STATE_ROT.LEFT;
        // }
        // else if (e.keyCode === 68) {
        //     this.rotState = this.STATE_ROT.RIGHT;
        // }
    }

    // When user releases the key
    onKeyUp(e) {
        if (e.keyCode === 87) {
            this.stateMoveX = this.STATE_MOVE_X.NONE;
        }
        else if (e.keyCode === 83) {
            this.stateMoveX = this.STATE_MOVE_X.NONE;
        }
        else if (e.keyCode === 65) {
            this.stateMoveY = this.STATE_MOVE_Y.NONE;
        }
        else if (e.keyCode === 68) {
            this.stateMoveY = this.STATE_MOVE_Y.NONE;
        }
        // else if (e.keyCode === 65) {
        //     this.rotState = this.STATE_ROT.NONE;
        // }
        // else if (e.keyCode === 68) {
        //     this.rotState = this.STATE_ROT.NONE;
        // }
    }

    start() {
        this._camera.update();
    }

    moveForward(dt) {
        const map = this._map.grid;
        if (map[Math.floor(this.x + this.dirX * this._moveSpeed * 4 * dt)] &&        //check for collision
            map[Math.floor(this.x + this.dirX * this._moveSpeed * 4 * dt)][Math.floor(this.y)] === 0) {
            this.x += this.dirX * this._moveSpeed * dt;
        }
        if (map[Math.floor(this.x)][Math.floor(this.y + this.dirY * this._moveSpeed * 4 * dt)] === 0) {
            this.y += this.dirY * this._moveSpeed * dt;
        }
    }

    moveBack(dt) {
        const map = this._map.grid;
        if (map[Math.round(this.x - this.dirX * this._moveSpeed * 4 * dt)] &&        //check for collision
            map[Math.round(this.x - this.dirX * this._moveSpeed * 4 * dt)][Math.round(this.y)] === 0) {
            this.x -= this.dirX * this._moveSpeed * dt;
        }
        if (map[Math.round(this.x)][Math.round(this.y - this.dirY * this._moveSpeed * 6 * dt)] === 0) {
            this.y -= this.dirY * this._moveSpeed * dt;
        }
    }

    // TODO: Do we need dirY?
    // TODO: Collision handling
    moveLeft(dt) {
        const map = this._map.grid;
        this.y += this._moveSpeed * dt;
    }

    // TODO: Do we need dirY?
    // TODO: Collision handling
    moveRight(dt) {
        const map = this._map.grid;
        this.y -= this._moveSpeed * dt;
    }

    update(dt) {
        switch (this.stateMoveX) {
            case this.STATE_MOVE_X.FORWARD: {
                this.moveForward(dt);
                break;
            }
            case this.STATE_MOVE_X.BACK: {
                this.moveBack(dt);
                break;
            }
        }
        switch (this.stateMoveY) {
            case this.STATE_MOVE_Y.LEFT: {
                console.log("left");
                this.moveLeft(dt);
                break;
            }
            case this.STATE_MOVE_Y.RIGHT: {
                console.log("right");
                this.moveRight(dt);
                break;
            }
        }
        // switch (this.rotState) {
        //     case this.STATE_ROT.LEFT: {
        //         this.rotate(this._rotSpeed * dt);
        //         break;
        //     }
        //     case this.STATE_ROT.RIGHT: {
        //         this.rotate(-this._rotSpeed * dt);
        //         break;
        //     }
        // }

        this._camera.update();
    }

    rotate(angle) {
        //both camera direction and camera plane must be rotated
        const oldDirX = this.dirX;
        this.dirX = this.dirX * Math.cos(angle) - this.dirY * Math.sin(angle);
        this.dirY = oldDirX * Math.sin(angle) + this.dirY * Math.cos(angle);

        const plane = this._camera.plane;
        const oldPlaneX = plane.x;
        plane.x = plane.x * Math.cos(angle) - plane.y * Math.sin(angle);
        plane.y = oldPlaneX * Math.sin(angle) + plane.y * Math.cos(angle);
    }

    get yAdjust() {
        return this._yAdjust;
    }

    set yAdjust(val) {
        this._yAdjust = val;
    }

    get camera() {
        return this._camera;
    }
}