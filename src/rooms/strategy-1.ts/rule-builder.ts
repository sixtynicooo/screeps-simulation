// soluzione che aggiorna creeps la proprietà weoking o no.
export function activityBuilder(creep:Creep) {
    const sources = creep.room.find(FIND_SOURCES);
    if( !creep.memory.working){
        if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
            // non ci soono risorse nelle vicinanze? Vado verso risorse
            creep.moveTo(sources[0],{ visualizePathStyle: { stroke: '#8c2f54' } });
        }else{
            // a quanto pare è vicino alle risorse quindi inizio a recuperare risorse
            creep.memory.working=true
            creep.say('🚧 build');
        }
    }else{
        if(creep.store.getFreeCapacity()>0 && creep.harvest(sources[0]) === OK){
            // recupero finchè sono pieno
            creep.moveTo(sources[0],{ visualizePathStyle: { stroke: '#8c2f54' } });
        }else if(creep.store[RESOURCE_ENERGY]>0){
            // provo a costuire extension
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            console.log(targets)

            if(targets.length>0){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    // vado a costruite
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }else{
            creep.memory.working=false
            creep.say('🔄 harvest');
        }
    }
}

/* export function activityBuilder(creep: Creep, spawn: StructureSpawn) {
     if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.working) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
}
 */
