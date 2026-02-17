export function cleanRoomCreeps(roomNameString: string){
    for (const creep in Memory.creeps) {
        if(!Game.creeps[creep]){
            delete Memory.creeps[creep]
        }
    }
}
