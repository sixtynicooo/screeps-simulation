import { strategia1 } from "./strategy-1.ts/strategy1";

/**
 * Solo la prima volta ha senso iterare poi salvo room
 * OTTIMIZZAZIONE salvare rooms mie al posto di fare ogni volta iterazione su tutto
*/
export function runRoomManager(): void {
    if(!Memory.rooms){
        Memory.rooms={}
    }
  for (const roomName in Game.rooms) {
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
    manageRoom(room,level,roomName);
    break
    }
}

// ogni room avrà una strategia in base al livello del controller
function manageRoom(room: Room, level: number, roomName: string): void {
  // console.log(`Gestisco room: ${room.name} livello ${level}`);
  switch(level){
    case 1:
        strategia1(room,roomName)
    break
  }
}
