export function cleanRoomCreeps(){
    for (const creep in Memory.creeps) {
        if(!Game.creeps[creep]){
            delete Memory.creeps[creep]
        }
    }
}
