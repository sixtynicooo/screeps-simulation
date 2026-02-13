export function activityHarvester(creeps:Creep[]) {
        for(let creep of creeps){
            console.log(creep.store.getFreeCapacity(),creep.store.getCapacity(),creep.memory.working)
            if(creep.store.getFreeCapacity()===creep.store.getCapacity() && !creep.memory.working) {
                const sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);

                }
            } else if(creep.store.getFreeCapacity()===creep.store.getCapacity() && creep.memory.working ){
                creep.memory.working=false
            }
            else if((creep.store.getFreeCapacity()>0 && !creep.memory.working )){
                creep.memory.working=true
            }else if(creep.memory.working && creep.store.getFreeCapacity()>0){
                const sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }

            }else if((creep.store.getFreeCapacity()===0 && !creep.memory.working )){
            if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                    console.log('trasferisco indietro',creep.memory.working)
                }
            }
            else if(creep.store.getFreeCapacity()===0 && creep.memory.working) {
                if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                    console.log('trasferisco indietero',creep.memory.working)
            }
        }
    }
}
