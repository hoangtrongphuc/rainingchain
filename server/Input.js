//LICENSED CODE BY SAMUEL MAGNAN FOR RAININGCHAIN.COM, LICENSE INFORMATION AT GITHUB.COM/RAININGCHAIN/RAININGCHAIN
/*jshint -W018*/
"use strict";
var Actor = require2('Actor');
var Input = exports.Input = {};

//mouse in Button.handClickServerSide
Input.key = function(socket,d){
	socket.timer = 0;
	var act = Actor.get(socket.key);
		
	if(act.useUpdateInput) return;
	if(d.i){
		//d.i format: right,down,left,up,ability0,ability1...
		var move = d.i.slice(0,4);
		
		act.moveInput.right = !!+move[0];
		act.moveInput.down = !!+move[1];
		act.moveInput.left = !!+move[2];
		act.moveInput.up = !!+move[3];
		act.abilityChange.press = d.i.slice(4);
		
		if(act.abilityChange.press !== '000000' && act.combat) 
			Actor.ability.loop.clickVerify(act);
	}
	if(d.t){
		act.targetSub = Actor.TargetSub(d.t[0],d.t[1],callback);
	}
	
	if(d.m){
		act.mouseX = Math.min(Math.max(d.m[0],-CST.WIDTH),CST.WIDTH);
		act.mouseY = Math.min(Math.max(d.m[1],-CST.HEIGHT),CST.HEIGHT);
	}
	act.angle = Tk.atan2(act.mouseY,act.mouseX);	
}

var callback = function(key){
	Actor.get(key).targetSub.active = false;
};

