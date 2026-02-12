export function activityHarvester(creeps:Creep[]) {
    for(let creep of creeps){
        console.log(creep.store.getFreeCapacity(),creep.store.getCapacity(),creep.memory.working)
        if(creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.memory.working=true
            }
        }
        else if(creep.store.getFreeCapacity()===0 && creep.memory.working) {
            if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
        else if(creep.store.getFreeCapacity()>0 && creep.store.getFreeCapacity()===creep.store.getCapacity()) {
            creep.memory.working=true
        }
    }
}

/* for(let creep in creeps){
 if(creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
            if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }

    }
 */
