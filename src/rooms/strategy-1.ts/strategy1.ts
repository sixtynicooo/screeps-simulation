import { RoomCreepCounts, RoomStrategyConfig } from "main";
import { activityHarvester } from "./rule-harvester";
import { activityUpgrader } from "./rule-upgrader";

export function strategia1(room: Room, roomName: string, roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig,levelRoom:number): void {
   const spawns=room.find(FIND_MY_SPAWNS)

   if(!spawns.length){
     console.log("Nessuno spawn in questa room");
     return
    }
    const spawn=spawns[0]
    const creepsInRoom=room.find(FIND_MY_CREEPS)

    // prima di tutto voglio essere certo che esista almeeno 1 Harvester
    if(!controlExistHarvester(spawn,creepsInRoom,roomName,roomCreeps,roomCreepConfig,levelRoom)) {
      controlExistUpgrader(spawn,creepsInRoom,roomName,roomCreeps,roomCreepConfig,levelRoom)
    }

      for(let creep of creepsInRoom){
        if(creep.memory.role==='harvester'){
          activityHarvester(creep,spawn)
        }else if(creep.memory.role==='upgrader'){
          activityUpgrader(creep)
          }
      }

}

function controlExistHarvester(spawn: StructureSpawn, creepsInRoom: Creep[], roomName: string, roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig,levelRoom:number){
  let spawnOne=false
  if(!spawn.spawning && roomCreeps[roomName]['harvester']<roomCreepConfig['peace'][levelRoom].harvester){
    console.log('harvester',roomCreeps[roomName]['harvester'])
      const name=`Harvester${roomName}${Game.time}`
      spawn.spawnCreep([WORK, CARRY, MOVE],name,{memory:{
        role: 'harvester',
        room: roomName,
        working: false,
        livello:1
        }
      })
      spawnOne= true
    }
    return spawnOne
}

function controlExistUpgrader(spawn: StructureSpawn, creepsInRoom: Creep[], roomName: string, roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig, levelRoom: number) {
  let spawnOne=false
  if(!spawn.spawning && roomCreeps[roomName]['upgrader']<roomCreepConfig['peace'][levelRoom].upgrader){
     console.log('harvester',roomCreeps[roomName]['upgrader'])
      const name=`Upgrader${roomName}${Game.time}`
      spawn.spawnCreep([WORK, CARRY, MOVE],name,{memory:{
        role: 'upgrader',
        room: roomName,
        working: false,
        livello:1
        }
      })
      spawnOne= true
    }
    return spawnOne
}
