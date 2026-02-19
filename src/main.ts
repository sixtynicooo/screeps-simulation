import { roomCreepConfig } from "costanti";
import { runRoomManager } from "rooms/manager-rooms";
import { Nullable } from "type";
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
    building:Nullable<RoomPosition>
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

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {


  // console.log(`Current game tick is ${Game.time} livello 1 gcl ${Game.gcl.level}`);

  // Oggetto dove accumulare i dati
  const roomCreeps: RoomCreepCounts = {};
  runRoomManager(roomCreeps,roomCreepConfig);
});
