import { runRoomManager } from "rooms/manager-rooms";
import { ErrorMapper } from "utils/ErrorMapper";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definition alone.
          You must also give them an implementation if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface RoomMemory{
    spawnId:Id<StructureSpawn>
  }

  type creepRole='harvester'|'upgrader'|'builder'|'attacker'|'defender'

  interface CreepMemory {
    role: creepRole;
    room: string;
    working: boolean;
    livello:number
  }
}
// Syntax for adding properties to `global` (ex "global.log")
declare const global: {
  log: any;
}


// alcune interfacce utili

type RoleCounts ={
    [role in creepRole]: number;
}

export interface RoomCreepCounts {
    [roomName: string]: RoleCounts;
}

// gestione livelli room con minimo creep
type stateRooms='peace'|'war'

type MinCreepsConfig ={
    [role in creepRole]: number;
}

export type RoomStrategyConfig ={
    [strategy in stateRooms]: {
        [controllerLevel: number]: MinCreepsConfig;
    };
}

// Oggetto di configurazione globale
const roomCreepConfig: RoomStrategyConfig = {
    peace: {
        1: { harvester: 2, upgrader: 1, builder: 0,attacker: 0, defender: 0 },
        2: { harvester: 2, upgrader: 1, builder: 1 ,attacker: 0, defender: 0 },
        3: { harvester: 3, upgrader: 2, builder: 2 ,attacker: 0, defender: 0 },
        4: { harvester: 4, upgrader: 2, builder: 2 ,attacker: 0, defender: 0 },
        5: { harvester: 4, upgrader: 3, builder: 3 ,attacker: 0, defender: 0 },
        6: { harvester: 5, upgrader: 3, builder: 3 ,attacker: 0, defender: 0 },
        7: { harvester: 5, upgrader: 4, builder: 4 ,attacker: 0, defender: 0 },
        8: { harvester: 6, upgrader: 5, builder: 5 ,attacker: 0, defender: 0 },
    },
    war: {
        1: { harvester: 2, upgrader: 1,  builder: 1,attacker: 1, defender: 1 },
        2: { harvester: 3, upgrader: 1, builder: 1, attacker: 2, defender: 2 },
        3: { harvester: 3, upgrader: 2, builder: 2, attacker: 3, defender: 3 },
        4: { harvester: 4, upgrader: 2, builder: 2, attacker: 4, defender: 4 },
        5: { harvester: 4, upgrader: 3, builder: 3, attacker: 5, defender: 5 },
        6: { harvester: 5, upgrader: 3, builder: 3, attacker: 6, defender: 6 },
        7: { harvester: 5, upgrader: 4, builder: 4, attacker: 7, defender: 7 },
        8: { harvester: 6, upgrader: 5, builder: 5, attacker: 8, defender: 8 },
    },
};




// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // console.log(`Current game tick is ${Game.time} livello 1 gcl ${Game.gcl.level}`);

  // Oggetto dove accumulare i dati
  const roomCreeps: RoomCreepCounts = {};
  runRoomManager(roomCreeps,roomCreepConfig);

});
