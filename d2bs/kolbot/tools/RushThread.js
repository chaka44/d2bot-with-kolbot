/**
*	@filename	RushThread.js
*	@author		kolton
*	@desc		Second half of the Rusher script
*/

js_strict(true);

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("Gambling.js");
include("AutoMule.js");
include("CraftingSystem.js");
include("TorchSystem.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/Config.js");
include("common/CollMap.js");
include("common/Loader.js");
include("common/Misc.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Storage.js");
include("common/Town.js");

var gidList = [];

function main() {
	this.playerIn = function (area) {
		if (!area) {
			area = me.area;
		}

		var party = getParty();

		if (party) {
			do {
				if (party.name !== me.name && party.area === area) {
					return true;
				}
			} while (party.getNext());
		}

		return false;
	};

	this.bumperCheck = function () {
		var party = getParty();

		if (party) {
			do {
				if (party.name !== me.name) {
					switch (me.diff) {
					case 0:
						if (party.level >= 20) {
							return true;
						}

						break;
					case 1:
						if (party.level >= 40) {
							return true;
						}

						break;
					}
				}
			} while (party.getNext());
		}

		return false;
	};

	this.playersInAct = function (act) {
		var area, party,
			areas = [0, 1, 40, 75, 103, 109];

		if (!act) {
			act = me.act;
		}

		area = areas[act];
		party = getParty();

		if (party) {
			do {
				if (party.name !== me.name && party.area !== area) {
					return false;
				}
			} while (party.getNext());
		}

		return true;
	};

	this.andariel = function () {
		Town.doChores();
		Pather.useWaypoint(35, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22582, 9612)) {
			throw new Error("andy failed");
		}

		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 40, 3000, true);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(22582, 9612);
			delay(250);
		}

		Attack.kill(156);
		say("2");
		Pather.moveTo(22582, 9612);

		while (this.playerIn()) {
			delay(250);
		}

		Pather.usePortal(null, me.name);
		say("a2");
		Pather.useWaypoint(40, true);

		while (!this.playersInAct(2)) {
			delay(250);
		}

		return true;
	};

	this.cube = function () {
		if (me.diff === 0) {
			Pather.useWaypoint(57, true);
			Precast.doPrecast(true);

			if (!Pather.moveToExit(60, true) || !Pather.moveToPreset(me.area, 2, 354)) {
				throw new Error("cube failed");
			}

			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 30, 3000, true);
			say("1");

			while (!this.playerIn()) {
				delay(100);
			}

			while (this.playerIn()) {
				delay(100);
			}

			Pather.usePortal(null, me.name);
		}

		return true;
	};

	this.amulet = function () {
		Town.doChores();
		Pather.useWaypoint(44, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([45, 58, 61], true) || !Pather.moveTo(15044, 14045)) {
			throw new Error("amulet failed");
		}

		Pather.makePortal();

		if (me.diff < 2) {
			Attack.securePosition(me.x, me.y, 25, 3000);
		} else {
			Attack.securePosition(me.x, me.y, 25, 3000, true, true);
		}

		say("1");

		while (!this.playerIn()) {
			delay(100);
		}

		while (this.playerIn()) {
			delay(100);
		}

		Pather.usePortal(null, me.name);

		return true;
	};

	this.staff = function () {
		Town.doChores();
		Pather.useWaypoint(43, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
			throw new Error("staff failed");
		}

		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 30, 3000, true);
		say("1");

		while (!this.playerIn()) {
			//Pather.moveToPreset(me.area, 2, 356);
			delay(100);
		}

		while (this.playerIn()) {
			delay(100);
		}

		Pather.usePortal(null, me.name);

		return true;
	};

	this.summoner = function () {
		// right up 25449 5081 (25431, 5011)
		// left up 25081 5446 (25011, 5446)
		// right down 25830 5447 (25866, 5431)
		// left down 25447 5822 (25431, 5861)

		Town.doChores();
		Pather.useWaypoint(74, true);
		Precast.doPrecast(true);

		var i, journal,
			preset = getPresetUnit(me.area, 2, 357),
			spot = {};

		switch (preset.roomx * 5 + preset.x) {
		case 25011:
			spot = {x: 25081, y: 5446};
			break;
		case 25866:
			spot = {x: 25830, y: 5447};
			break;
		case 25431:
			switch (preset.roomy * 5 + preset.y) {
			case 5011:
				spot = {x: 25449, y: 5081};
				break;
			case 5861:
				spot = {x: 25447, y: 5822};
				break;
			}

			break;
		}

		if (!Pather.moveToUnit(spot)) {
			throw new Error("summoner failed");
		}

		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 25, 3000);
		say("1");

		while (!this.playerIn()) {
			Pather.moveToUnit(spot);
			Attack.securePosition(me.x, me.y, 25, 500);
			delay(250);
		}

		Pather.moveToPreset(me.area, 2, 357);
		Attack.kill(250);
		say("2");

		while (this.playerIn()) {
			delay(100);
		}

		Pickit.pickItems();
		Pather.moveToPreset(me.area, 2, 357);

		journal = getUnit(2, 357);

		for (i = 0; i < 5; i += 1) {
			journal.interact();
			delay(1000);
			me.cancel();

			if (Pather.getPortal(46)) {
				break;
			}
		}

		if (i === 5) {
			throw new Error("summoner failed");
		}

		Pather.usePortal(46);

		return true;
	};

	this.duriel = function () {
		if (me.inTown) {
			Town.doChores();
			Pather.useWaypoint(46, true);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
			throw new Error("duriel failed");
		}

		Pather.makePortal();

		if (me.diff < 2) {
			Attack.securePosition(me.x, me.y, 30, 3000, true);
		} else {
			Attack.securePosition(me.x, me.y, 25, 3000, true, true);
		}

		say("1");

		while (!this.playerIn()) {
			//Pather.moveToPreset(me.area, 2, 152, 0, -5);
			delay(100);
		}

		while (this.playerIn()) {
			delay(100);
		}

		while (!getUnit(2, 100)) {
			delay(500);
		}

		Pather.useUnit(2, 100, 73);
		Attack.kill(211);
		Pickit.pickItems();

		Pather.teleport = false;

		Pather.moveTo(22579, 15706);

		Pather.teleport = true;

		Pather.moveTo(22577, 15649, 10);
		Pather.moveTo(22577, 15609, 10);
		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			delay(100);
		}

		Pather.usePortal(null, me.name);
		say("a3");
		Pather.useWaypoint(75, true);

		while (!this.playersInAct(3)) {
			delay(250);
		}

		return true;
	};

	this.travincal = function () {
		Town.doChores();
		Pather.useWaypoint(83, true);
		Precast.doPrecast(true);

		var coords = [me.x, me.y];

		Pather.moveTo(coords[0] - 24, coords[1]);
		Pather.moveTo(coords[0] - 24, coords[1] - 135);
		Pather.moveTo(coords[0] + 81, coords[1] - 135);
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 25, 3000);
		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(coords[0] + 81, coords[1] - 135);
			delay(250);
		}

		Pather.moveTo(coords[0] + 97, coords[1] - 68);
		Attack.kill(getLocaleString(2863));
		Attack.kill(getLocaleString(2862));
		Attack.kill(getLocaleString(2860));
		say("2");
		Pather.moveTo(coords[0] + 81, coords[1] - 135);
		Pather.usePortal(null, me.name);

		return true;
	};

	this.mephisto = function () {
		Town.doChores();
		Pather.useWaypoint(101, true);
		Precast.doPrecast(true);
		Pather.moveToExit(102, true);
		Pather.moveTo(17591, 8070);

		var monsta,
			monList = [];

		monsta = getUnit(1);

		if (monsta) {
			do {
				if (Attack.checkMonster(monsta) && getDistance(monsta, 17627, 8070) <= 30) {
					monList.push(copyUnit(monsta));
				}
			} while (monsta.getNext());
		}

		if (monList.length) {
			Pather.moveTo(17627, 8070);
			Attack.clearList(monList);
		}

		Pather.moveTo(17591, 8070);
		Pather.makePortal();

		monsta = getUnit(1, "hydra");

		if (monsta) {
			do {
				while (monsta.mode !== 0 && monsta.mode !== 12 && monsta.hp > 0) {
					delay(500);
				}
			} while (monsta.getNext());
		}

		say("1");

		while (!this.playerIn()) {
			Pather.moveTo(17591, 8070);
			delay(250);
		}

		Attack.kill(242);
		say("a4");
		Pather.moveTo(17591, 8070);
		delay(2000);
		Pather.usePortal(null);

		return true;
	};

	this.diablo = function () {
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				throw new Error("Seal preset not found. Can't continue.");
			}

			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}

			return 2;
		};

		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};

		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < (name === getLocaleString(2853) ? 14 : 12); i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					if (name === getLocaleString(2852)) {
						this.chaosPreattack(getLocaleString(2852), 8);
					}

					Attack.kill(name);
					Pickit.pickItems();

					return true;
				}

				delay(250);
			}

			return !!glow;
		};

		this.chaosPreattack = function (name, amount) {
			var i, n, target, positions;

			switch (me.classid) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				target = getUnit(1, name);

				if (!target) {
					return;
				}

				positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

				for (i = 0; i < positions.length; i += 1) {
					if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
						Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
						Skill.setSkill(Config.AttackSkill[2], 0);

						for (n = 0; n < amount; n += 1) {
							Skill.cast(Config.AttackSkill[1], 1);
						}

						break;
					}
				}

				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			}
		};

		this.openSeal = function (id) {
			Pather.moveToPreset(108, 2, id, 4);

			var i, tick,
				seal = getUnit(2, id);

			if (seal) {
				for (i = 0; i < 3; i += 1) {
					seal.interact();

					tick = getTickCount();

					while (getTickCount() - tick < 500) {
						if (seal.mode) {
							return true;
						}

						delay(10);
					}
				}
			}

			return false;
		};

		Town.doChores();
		Pather.useWaypoint(107, true);
		Precast.doPrecast(true);
		Pather.moveTo(7790, 5544);
		this.initLayout();

		if (!this.openSeal(395) || !this.openSeal(396)) {
			throw new Error("Failed to open seals");
		}

		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292);
		} else {
			Pather.moveTo(7695, 5316);
		}

		if (!this.getBoss(getLocaleString(2851))) {
			throw new Error("Failed to kill Vizier");
		}

		if (!this.openSeal(394)) {
			throw new Error("Failed to open seals");
		}

		if (this.seisLayout === 1) {
			Pather.moveTo(7771, 5196);
		} else {
			Pather.moveTo(7798, 5186);
		}

		if (!this.getBoss(getLocaleString(2852))) {
			throw new Error("Failed to kill de Seis");
		}

		if (!this.openSeal(392) || !this.openSeal(393)) {
			throw new Error("Failed to open seals");
		}

		if (this.infLayout === 1) {
			delay(1);
		} else {
			Pather.moveTo(7928, 5295); // temp
		}

		if (!this.getBoss(getLocaleString(2853))) {
			throw new Error("Failed to kill Infector");
		}

		Pather.moveTo(7763, 5267);
		Pather.makePortal();
		Pather.moveTo(7727, 5267);
		say("1");

		while (!this.playerIn()) {
			delay(250);
		}

		Pather.moveTo(7763, 5267);

		while (!getUnit(1, 243)) {
			delay(500);
		}

		Attack.kill(243);

		if (me.gametype > 0) {
			say("a5");

			while (!this.playersInAct(5)) {
				delay(250);
			}
		}

		Pickit.pickItems();

		if (!Pather.usePortal(null, me.name)) {
			Town.goToTown();
		}

		return true;
	};

	this.ancients = function () {
		if (me.diff === 2) {
			say("Hell rush complete~");
			delay(500);
			quit();

			return false;
		}

		if (!this.bumperCheck()) {
			say("No eligible bumpers detected. Rush complete~");
			delay(500);
			quit();

			return false;
		}

		var altar;

		Town.doChores();
		Pather.useWaypoint(118, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit(120, true)) {
			throw new Error("Failed to go to Ancients way.");
		}

		Pather.moveTo(10089, 12622);
		Pather.makePortal();
		say("3");

		while (!this.playerIn()) {
			delay(250);
		}

		Pather.moveTo(10048, 12628);

		altar = getUnit(2, 546);

		if (altar) {
			while (altar.mode !== 2) {
				Pather.moveToUnit(altar);
				altar.interact();
				delay(2000 + me.ping);
				me.cancel();
			}
		}

		while (!getUnit(1, 542)) {
			delay(250);
		}

		Attack.clear(50);
		Pather.moveTo(10089, 12622);
		me.cancel();
		Pather.makePortal();

		while (this.playerIn()) {
			delay(100);
		}

		if (!Pather.usePortal(null, me.name)) {
			Town.goToTown();
		}

		return true;
	};

	this.baal = function () {
		if (me.diff === 2) {
			say("Hell rush complete~");
			delay(500);
			quit();

			return false;
		}

		if (!this.bumperCheck()) {
			say("No eligible bumpers detected. Rush complete~");
			delay(500);
			quit();

			return false;
		}

		var tick, portal;

		this.preattack = function () {
			var check;

			switch (me.classid) {
			case 1:
				if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
					if (me.getState(121)) {
						delay(500);
					} else {
						Skill.cast(Config.AttackSkill[1], 0, 15093, 5024);
					}
				}

				return true;
			case 3: // Paladin
				if (Config.AttackSkill[3] !== 112) {
					return false;
				}

				if (getDistance(me, 15093, 5029) > 3) {
					Pather.moveTo(15093, 5029);
				}

				if (Config.AttackSkill[4] > 0) {
					Skill.setSkill(Config.AttackSkill[4], 0);
				}

				Skill.cast(Config.AttackSkill[3], 1);

				return true;
			case 5: // Druid
				if (Config.AttackSkill[3] === 245) {
					Skill.cast(Config.AttackSkill[3], 0, 15093, 5029);

					return true;
				}

				break;
			case 6:
				if (Config.UseTraps) {
					check = ClassAttack.checkTraps({x: 15093, y: 5029});

					if (check) {
						ClassAttack.placeTraps({x: 15093, y: 5029}, 5);

						return true;
					}
				}

				break;
			}

			return false;
		};

		this.checkThrone = function () {
			var monster = getUnit(1);

			if (monster) {
				do {
					if (Attack.checkMonster(monster) && monster.y < 5080) {
						switch (monster.classid) {
						case 23:
						case 62:
							return 1;
						case 105:
						case 381:
							return 2;
						case 557:
							return 3;
						case 558:
							return 4;
						case 571:
							return 5;
						default:
							Attack.getIntoPosition(monster, 10, 0x4);
							Attack.clear(15);

							return false;
						}
					}
				} while (monster.getNext());
			}

			return false;
		};

		this.clearThrone = function () {
			var i, monster,
				monList = [],
				pos = [15097, 5054, 15085, 5053, 15085, 5040, 15098, 5040, 15099, 5022, 15086, 5024];

			if (Config.AvoidDolls) {
				monster = getUnit(1, 691);

				if (monster) {
					do {
						if (monster.x >= 15072 && monster.x <= 15118 && monster.y >= 5002 && monster.y <= 5079 && Attack.checkMonster(monster) && Attack.skipCheck(monster)) {
							monList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (monList.length) {
					Attack.clearList(monList);
				}
			}

			for (i = 0; i < pos.length; i += 2) {
				Pather.moveTo(pos[i], pos[i + 1]);
				Attack.clear(30);
			}
		};

		this.checkHydra = function () {
			var monster = getUnit(1, "hydra");

			if (monster) {
				do {
					if (monster.mode !== 12 && monster.getStat(172) !== 2) {
						Pather.moveTo(15118, 5002);

						while (monster.mode !== 12) {
							delay(500);

							if (!copyUnit(monster).x) {
								break;
							}
						}

						break;
					}
				} while (monster.getNext());
			}

			return true;
		};

		Town.doChores();
		Pather.useWaypoint(129, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([130, 131], true)) {
			throw new Error("Failed to move to Throne of Destruction.");
		}

		Pather.moveTo(15113, 5040);
		Attack.clear(15);
		this.clearThrone();

		tick = getTickCount();
		Pather.moveTo(15093, me.classid === 3 ? 5029 : 5039);

MainLoop:
		while (true) {
			if (getDistance(me, 15093, me.classid === 3 ? 5029 : 5039) > 3) {
				Pather.moveTo(15093, me.classid === 3 ? 5029 : 5039);
			}

			if (!getUnit(1, 543)) {
				break MainLoop;
			}

			switch (this.checkThrone()) {
			case 1:
				Attack.clear(40);

				tick = getTickCount();

				Precast.doPrecast(true);

				break;
			case 2:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 4:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 3:
				Attack.clear(40);
				this.checkHydra();

				tick = getTickCount();

				break;
			case 5:
				Attack.clear(40);

				break MainLoop;
			default:
				if (getTickCount() - tick < 7e3) {
					if (me.getState(2)) {
						Skill.setSkill(109, 0);
					}

					break;
				}

				if (!this.preattack()) {
					delay(100);
				}

				break;
			}

			Precast.doPrecast(false);
			delay(10);
		}

		Pather.moveTo(15092, 5011);
		Precast.doPrecast(true);

		while (getUnit(1, 543)) {
			delay(500);
		}

		delay(1000);

		portal = getUnit(2, 563);

		if (portal) {
			Pather.usePortal(null, null, portal);
		} else {
			throw new Error("Couldn't find portal.");
		}

		Pather.makePortal();
		delay(1000);
		say("3");

		while (!this.playerIn()) {
			delay(250);
		}

		Pather.moveTo(15134, 5923);
		Attack.kill(544); // Baal
		Pickit.pickItems();

		return true;
	};

	this.clearArea = function (area) {
		Pather.journeyTo(area);
		Attack.clearLevel(0);
		say("Done clearing area: " + area);
	};

	// Quests
	this.izual = function () {
		var izualCoords, myPosition, merc, izualPreset, timer, izual, monster,
			moveAway = function (unit, range) {
				var i, coordx, coordy,
					angle = Math.round(Math.atan2(me.y - unit.y, me.x - unit.x) * 180 / Math.PI),
					angles = [0, 45, -45, 90, -90, 135, -135, 180];

				for (i = 0; i < angles.length; i += 1) {
					coordx = Math.round((Math.cos((angle + angles[i]) * Math.PI / 180)) * range + unit.x);
					coordy = Math.round((Math.sin((angle + angles[i]) * Math.PI / 180)) * range + unit.y);

					try {
						if (!(getCollision(unit.area, coordx, coordy) & 0x1)) {
							return Pather.moveTo(coordx, coordy);
						}
					} catch (e) {

					}
				}

				return false;
			},
			nearbyMonsterCheck = function (range) {
				var monster = getUnit(1);

				if (monster) {
					do {
						if (Attack.checkMonster(monster) && getDistance(me, monster) < range) {
							return monster;
						}
					} while (monster.getNext());
				}

				return false;
			};

		Pather.useWaypoint(106, true);
		Precast.doPrecast(false);

		izualPreset = getPresetUnit(105, 1, 256);
		izualCoords = {
			area: 105,
			x: izualPreset.roomx * 5 + izualPreset.x,
			y: izualPreset.roomy * 5 + izualPreset.y
		};

		moveAway(izualCoords, 55);

		izual = getUnit(1, 256);

		if (izual) {
			moveAway(izual, 55);
		}

		merc = me.getMerc();
		myPosition = {
			x: me.x,
			y: me.y
		};

		while (true) {
			monster = nearbyMonsterCheck(35);

			if (!monster) {
				if (!timer) {
					me.overhead("Safe Timer Start");

					timer = getTickCount();
				}

				if (timer && getTickCount() - timer >= 5000) {
					break;
				}
			} else {
				timer = 0;
			}

			izual = getUnit(1, 256);

			if (izual && getDistance(me, izual) < 40) {
				moveAway(izual, 55);

				myPosition = {
					x: me.x,
					y: me.y
				};
			}

			if (izual && getDistance(monster, izual) > 35) {
				try {
					Attack.kill(monster);
				} catch (e) {

				}
			} else {
				if (!izual || getDistance(me, izual) > 35) {
					Attack.clear(15);
				}
			}

			if (getDistance(me, myPosition) > 5 || (merc && getDistance(me, merc) > 10)) {
				Pather.teleportTo(myPosition.x, myPosition.y);
			}

			delay(200);
		}

		Pather.makePortal();
		say("1");

		while (!this.playerIn()) {
			monster = nearbyMonsterCheck(35);
			izual = getUnit(1, 256);

			if (monster) {
				if (izual && getDistance(monster, izual) > 35) {
					try {
						Attack.kill(monster);
					} catch (e2) {

					}
				} else {
					if (!izual || getDistance(me, izual) > 35) {
						Attack.clear(15);
					}
				}
			}

			if (getDistance(me, myPosition) > 5 || (merc && getDistance(me, merc) > 10)) {
				Pather.teleportTo(myPosition.x, myPosition.y);
			}

			delay(200);
		}

		Pather.moveToUnit(izualCoords); // Temporary line until hdin attack fix is up
		Attack.kill(256); // Izual
		Pather.usePortal(null, null);

		return true;
	};

	var i, command,
		current = 0,
		sequence = ["andariel", "cube", "amulet", "staff", "summoner", "duriel", "travincal", "mephisto", "diablo", "ancients", "baal"];

	this.scriptEvent = function (msg) {
		command = msg;
	};

	addEventListener("scriptmsg", this.scriptEvent);

	// Start
	Config.init(false);
	Pickit.init(false);
	Attack.init();
	Storage.Init();
	CraftingSystem.buildLists();
	Runewords.init();
	Cubing.init();

	while (true) {
		if (command) {
			switch (command) {
			case "go":
				if (current >= sequence.length) {
					say("bye ~");
					quit();

					break;
				}

				say("Starting " + sequence[current]);

				try {
					this[sequence[current]]();
				} catch (sequenceError) {
					say(sequenceError.message);
					Town.goToTown();
				}

				current += 1;

				command = "go";

				break;
			default:
				if (command.split(" ")[0] !== undefined && command.split(" ")[0] === "skiptoact") {
					if (!isNaN(parseInt(command.split(" ")[1], 10))) {
						switch (parseInt(command.split(" ")[1], 10)) {
						case 2:
							current = sequence.indexOf("andariel") + 1;

							break;
						case 3:
							current = sequence.indexOf("duriel") + 1;

							break;
						case 4:
							current = sequence.indexOf("mephisto") + 1;

							break;
						case 5:
							current = sequence.indexOf("diablo") + 1;

							break;
						}
					}
				} else if (command.split(" ")[0] !== undefined && command.split(" ")[0] === "clear") {
					this.clearArea(Number(command.split(" ")[1]));
					Town.goToTown();

					command = "go";
				} else {
					for (i = 0; i < sequence.length; i += 1) {
						if (command && sequence[i].match(command, "gi")) {
							current = i;

							break;
						}
					}

					Town.goToTown();

					command = "go";

					break;
				}

				break;
			}

			//command = false;
		}

		delay(100);
	}

	return true;
}
