import { ROOM_SIZE } from "costanti";

// capisco i tile exit , praticamente se nei bordi è 0 allora sicuramente è exit, questa è l'idea
export function salvoTileExit(room: Room){
    const terrain = room.getTerrain();

    for(let row=0;row<ROOM_SIZE;row++){
        for(let col=0;col<ROOM_SIZE;col++){
            if(row===0 || row===ROOM_SIZE-1 || col===0||col===ROOM_SIZE-1){
                const typeTerreno=terrain.get(row,col)
                if(terrain.get(row,col)===0){
                    console.log(typeTerreno,row,col)
                }
            }
        }
    }


}
