import { activityHarvester } from "./rule-harvester";

export function strategia1(room: Room, roomName: string): void {
   const spawns=room.find(FIND_MY_SPAWNS)

   if(!spawns.length){
     console.log("Nessuno spawn in questa room");
     return
    }
    const spawn=spawns[0]
    const creepsInRoom=room.find(FIND_MY_CREEPS)
    controlExistHarvester(spawn,creepsInRoom,roomName)
    activityHarvester(creepsInRoom)









}

function controlExistHarvester(spawn: StructureSpawn, creepsInRoom: Creep[], roomName: string){
    if(!spawn.spawning && creepsInRoom.length<1){
      const name=`WORK${roomName}${Game.time}`
      spawn.spawnCreep([WORK, CARRY, MOVE],name,{memory:{
        role: 'harvester',
        room: roomName,
        working: false,
        livello:1
        }
      })
    }
   }
