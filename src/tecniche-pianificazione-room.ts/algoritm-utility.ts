import { ROOM_SIZE } from "costanti";

// capisco i tile exit , praticamente se nei bordi è 0 allora sicuramente è exit, questa è l'idea
export function salvoTileExit(room: Room){
    const terrain = room.getTerrain();
    const visual = new RoomVisual(room.name)
    for(let x=0;x<ROOM_SIZE;x++){
        for(let y=0;y<ROOM_SIZE;y++){
            if(x===0 || x===ROOM_SIZE-1 || y===0||y===ROOM_SIZE-1){
                const typeTerreno=terrain.get(x,y)
                if(terrain.get(x,y)===0){

                    visual.rect(x-0.5,y-0.5,1,1,{
                        fill:'red'
                    })

                }
            }
        }
    }
}



export function getDistanceTransform(room: Room){
     let costs = new PathFinder.CostMatrix();

    const terrain = new Room.Terrain(room.name);
    const visual = new RoomVisual(room.name)
    const costWallEdge=0
    const costFree=100

    let max:number=0
    let maxDelta:number=5


    // gestisco costi, costEdge per muri e perimetro esterno
    // costFree tile vuoti dove creep possono spostarsi
    for(let x=0;x<ROOM_SIZE;x++){
        for(let y=0;y<ROOM_SIZE;y++){
                if(x===0 || x===ROOM_SIZE-1 || y===0||y===ROOM_SIZE-1){
                    costs.set(x,y,costWallEdge)
                    visual.rect(x-0.5,y-0.5,1,1,{
                    fill:'yellow'
                    })
                }else if(terrain.get(x,y)===1){
                    costs.set(x,y,costWallEdge)
                    visual.rect(x-0.5,y-0.5,1,1,{
                    fill:'brown'
                    })

                }else if(terrain.get(x,y)===0 ||terrain.get(x,y)===2){
                    costs.set(x,y,costFree)
                    visual.rect(x-0.5,y-0.5,1,1,{
                    fill:'white'
                    })

                }
            }
    }
    // passata da angolo su a sinistra che passa verso basso e destra
    for(let x=0;x<ROOM_SIZE;x++){
        for(let y=0;y<ROOM_SIZE;y++){
            // giu
            if(y+1<ROOM_SIZE){
                const costBottom=Math.min(costs.get(x,y+1),costs.get(x,y)+1)
                costs.set(x,y+1,costBottom)

            }
            //destra
            if(x+1<ROOM_SIZE){
                const costRight=Math.min(costs.get(x+1,y),costs.get(x,y)+1)
                costs.set(x+1,y,costRight)
            }
        }
    }

    for(let x=ROOM_SIZE-1;x>=0;x--){
        for(let y=ROOM_SIZE-1;y>=0;y--){
            // su
            if(y-1>-1){
                const costUp=Math.min(costs.get(x,y-1),costs.get(x,y)+1)
                costs.set(x,y-1,costUp)
            }

            //left
            if(x-1>-1){
                const costLeft=Math.min(costs.get(x-1,y),costs.get(x,y)+1)
                costs.set(x-1,y,costLeft)
            }
        }
    }

    // cerco max
    for(let x=0;x<ROOM_SIZE;x++){
        for(let y=0;y<ROOM_SIZE;y++){
           max=Math.max(max,costs.get(x,y))
        }
    }

    // coloro
    for(let x=0;x<ROOM_SIZE;x++){
        for(let y=0;y<ROOM_SIZE;y++){
            const colorMax=costs.get(x,y)>=max-maxDelta?'orange':'black'
            visual.text(String(costs.get(x,y)),x,y,{
            color:colorMax
            })
        }
    }

}
