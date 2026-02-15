// soluzione che aggiorna creeps la proprietà weoking o no.
export function activityHarvester(creep: Creep, spawn: StructureSpawn) {
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
        }else if(creep.store[RESOURCE_ENERGY]>0){
            // provo a trasferire energia
            const result = creep.transfer(spawn, RESOURCE_ENERGY)

            if(result===ERR_NOT_IN_RANGE){
                creep.moveTo(spawn,{ visualizePathStyle: { stroke: '#5f44af' } });
            }
        }else{
            creep.memory.working=false
        }
    }
}
