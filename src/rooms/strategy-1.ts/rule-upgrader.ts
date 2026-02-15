export function activityUpgrader(creep:Creep) {
    const sources = creep.room.find(FIND_SOURCES);
    if( !creep.memory.working){
        if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
            // non ci soono risorse nelle vicinanze? Vado verso risorse
            creep.moveTo(sources[0],{ visualizePathStyle: { stroke: '#8c2f54' } });
        }else{
            // a quanto pare è vicino alle risorse quindi inizio a recuperare risorse
            creep.memory.working=true
        }
    }else{
        if(creep.store.getFreeCapacity()>0 && creep.harvest(sources[0]) === OK){
            // recupero finchè sono pieno
            creep.moveTo(sources[0],{ visualizePathStyle: { stroke: '#8c2f54' } });
        }else if(creep.store[RESOURCE_ENERGY]>0 && creep.room.controller){
            // provo a fare upgrade
            const result = creep.upgradeController(creep.room.controller);

            if(result===ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller,{ visualizePathStyle: { stroke: '#5f44af' } });
            }
        }else{
            creep.memory.working=false
        }
    }
}
