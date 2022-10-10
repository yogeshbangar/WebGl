class Ball {
  constructor(_ball, _batsman, _bowler, _filder, _shadow) {
    this.ball = _ball;
    this.batsman = _batsman;
    this.bowler = _bowler;
    this.filder = _filder;
    this.shadow = _shadow;
    this.camerax = 0;
    this.shadow.rotation.set(-Math.PI * 0.5, 0, 0);
    this.spd = new THREE.Vector3(0, 0, 0);
    this.gravty = 0.01;
    this.bowler.mBody.scale.set(0.5, 2.0, 1);
    this.batsman.mBody.scale.set(1, 1, 1);

    this.batsman.annie.reset(0);
    this.bowler.annie.reset(0);

    this.bowler.mBody.position.set(64, 8, 0);
    this.batsman.mBody.position.set(-56, 8, 0);

    this.gameReset();
  }
  gameReset() {
    this.runArray = [0, 0, 0, 0, 0, 0];
    this.start = 0;
    this.firtBall = 0;
    this.bathit = 0;
    this.run = 0;
    this.short = 0;
    this.ballset();
    this.bNo = 0;
  }
  ballset() {
    this.bNo++;
    this.filder.annie.reset(0);
    this.filder.mBody.position.set(0, 20, 278);
    this.filder.mBody.scale.set(5, 2.5, 5);
    this.ball.position.set(66, 26, 0);
    this.ball.rotation.set(Math.PI * 0, 0, 0);
    this.spd.set(-1.2, 0, 0);
    this.ball.visible = true;
    this.status = 0;
    this.gravty = 0.01;
    this.anim = false;
    this.short = -1;
    this.camerax = 0;
    if (mGame !== undefined)
      new TWEEN.Tween(mGame.camera).to({ position: { x: 0 } }, 400).start();
  }
  update0(delta) {
    this.filder.annie.reset(sx);
    this.camerax = sy;

    //0-20 0
    //20-45 0
  }
  update(delta) {
    TWEEN.update();
    if (this.anim && this.filder.annie.currentTile < 124) {
      this.filder.annie.update(delta);
      if (this.filder.annie.currentTile > 20 && mGame.camera.position.x == 0) {
        if (this.filder.mBody.scale.x < 0)
          new TWEEN.Tween(mGame.camera)
            .to({ position: { x: 30 } }, 300)
            .start();
        else
          new TWEEN.Tween(mGame.camera)
            .to({ position: { x: -30 } }, 300)
            .start();
      }
    }
    if (
      this.ball.position.z > 270 &&
      this.ball.position.z < 278 &&
      this.status == 0 &&
      this.filder.annie.currentTile > 25 &&
      this.filder.annie.currentTile < 50
    ) {
      if (this.filder.mBody.scale.x > 0 && this.ball.position.x < 0)
        this.ball.visible = false;
      if (this.filder.mBody.scale.x < 0 && this.ball.position.x > 0)
        this.ball.visible = false;
      this.status = 1;
      console.log(
        "~~~1~~~~~~",
        this.ball.position,
        this.filder.annie.currentTile,
        this.status
      );
    }
    if (this.filder.annie.currentTile >= 100 && this.status == 1 && this.anim) {
      console.log(
        "~~~2~~~~~~",
        this.ball.position,
        this.filder.annie.currentTile,
        this.status
      );
      if (this.ball.visible == false) {
        if (this.filder.mBody.scale.x < 0) this.ball.position.set(28, 22, 200);
        else this.ball.position.set(-28, 22, 200);
        this.spd.set(0, 1.0, 0);
      }
      this.status = 2;
      this.ball.visible = true;
      this.run += this.short < 4 ? 6 : 4;
    }

    this.ball.position.add(this.spd);
    if (this.ball.position.y < 1) {
      this.spd.y = 0.81;
      if (this.short > 3) {
        this.spd.y = 0.1;
        this.gravty = 0.01;
      }
      // console.log(this.ball.position);
    }
    this.spd.y -= this.gravty;
    if (this.ball.position.x < -56) {
      this.short = Math.floor(Math.random() * 6);
      // this.short = 3;
      switch (this.short) {
        case 0: //Plat
          this.spd.set(0.14, 0.8, 1.6); //Left
          this.gravty = 0.011;
          break;
        case 1: //Plat
          this.spd.set(0.52, 0.82, 1.6); //Left
          this.gravty = 0.011;
          break;
        case 2: //Top
          this.spd.set(0.14, 1.1, 1.6); //left
          this.gravty = 0.014;
          break;
        case 3: //Top
          this.spd.set(0.53, 1.1, 1.6); //right
          this.gravty = 0.014;
          break;
        case 4: //ground
          this.spd.set(0.14, 0.1, 1.6); //right
          this.gravty = 0.054;
          break;
        case 5: //ground
          this.spd.set(0.52, 0.0, 1.6); //right
          this.gravty = 0.054;
          break;
      }
    }
    this.shadow.position.set(this.ball.position.x, 0.21, this.ball.position.z); //0-30
    this.shadow.visible = this.ball.visible;
    this.ball.rotation.set(
      mGame.counter * 0.1,
      mGame.counter * 0.1,
      mGame.counter * 0.1
    );
    if (
      this.ball.position.z > 450 ||
      (this.spd.y < 0 && this.ball.position.y < 50 && this.status == 2)
    ) {
      this.ballset();
      console.log(
        "~~~3~~~~~~",
        this.ball.position,
        this.filder.annie.currentTile,
        this.status
      );
      if (this.bNo >= 6) {
        mGame.setScreen(GAMERESULT);
      }
    }
  }
  setHit() {}
  tapScr(type) {
    if (type == 2) {
      if (mGame.mouse.x > 0) {
        this.setFiend(1);
      } else {
        this.setFiend(-1);
      }
    }
  }
  setFiend(side) {
    if (this.filder.annie.currentTile < 10) {
      if (side == 1) {
        this.filder.mBody.scale.set(-5, 2.5, 5);
        this.anim = true;
      }
      if (side == -1) {
        this.filder.mBody.scale.set(5, 2.5, 5);
        this.anim = true;
      }
    }
  }
}
