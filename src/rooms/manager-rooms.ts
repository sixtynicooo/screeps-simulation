import { RoomCreepCounts, RoomStrategyConfig } from "main";
import { strategia1 } from "./strategy-1.ts/strategy1";

/**
 * Solo la prima volta ha senso iterare poi salvo room
 * OTTIMIZZAZIONE salvare rooms mie al posto di fare ogni volta iterazione su tutto
*/
export function runRoomManager(roomCreeps: RoomCreepCounts, roomCreepConfig:RoomStrategyConfig): void {

    if(!Memory.rooms){
        Memory.rooms={}
    }
  for (const roomName in Game.rooms) {
    // inizializzo roomCreeps con nome room e i ruolo a partire da 0
    roomCreeps[roomName]={harvester: 0, upgrader: 0, builder: 0,attacker: 0, defender: 0 }

    const room = Game.rooms[roomName];
    // console.log(Game.rooms[roomName].controller,room?.controller?.my)
    if(!room.controller || !room.controller.my){
        continue
    }
    if( !Memory.rooms[roomName]){
        const spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length){
            Memory.rooms[roomName]={ spawnId: spawns[0].id }
        }
    }
    const level:number=room.controller.level
    // creo oggetto per i tipi presenti nella room
    getAllCreeepsRooms(room,roomName,roomCreeps)

    manageRoom(room,level,roomName,roomCreeps,roomCreepConfig);
    break
    }
}

// ogni room avrà una strategia in base al livello del controller
function manageRoom(room: Room, level: number, roomName: string, roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig): void {
  // console.log(`Gestisco room: ${room.name} livello ${level}`);



  switch(level){
    case 1:
        strategia1(room,roomName,roomCreeps,roomCreepConfig,level)
        break
    case 2:
        strategia1(room,roomName,roomCreeps,roomCreepConfig,level)
        break
  }
}

function getAllCreeepsRooms(room: Room, roomName: string, roomCreeps: RoomCreepCounts){
    const creepsInRoom=room.find(FIND_MY_CREEPS)
    for(let creep of creepsInRoom){
        //console.log(creep)
        roomCreeps[roomName][creep.memory.role]+=1
        console.log(creep.memory.role,roomCreeps[roomName][creep.memory.role])

    }

}
