import { RoomCreepCounts, RoomStrategyConfig } from "main";
import { strategia1 } from "./strategy-1.ts/strategy1";
import { choosePositionBuild, getDistanceTransform, salvoTileExit } from "tecniche-pianificazione-room.ts/algoritm-utility";
import { cleanRoomCreeps } from "memoria/utilityMemory";

/**
 * Solo la prima volta ha senso iterare poi salvo room
 * OTTIMIZZAZIONE salvare rooms mie al posto di fare ogni volta iterazione su tutto
*/
export function runRoomManager(roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig, visibleMapInfo: boolean): void {

    if(!Memory.rooms){
        Memory.rooms={}
    }
  for (const roomName in Game.rooms) {
      // delete eventuali creep non presenti in memoria
    cleanRoomCreeps()

    const room = Game.rooms[roomName];

    if(!room.controller || !room.controller.my){
        continue
    }
    if(!Memory.rooms[roomName]){
        Memory.rooms[roomName]={building:null,spawnId:[]}
    }

    if(!Memory.rooms[roomName]?.building){
        const tileEdgeExit:number[][]=salvoTileExit(room,visibleMapInfo)
        const costMatrix:CostMatrix= getDistanceTransform(room,visibleMapInfo)
        const posStartBuilding=choosePositionBuild(room,costMatrix,tileEdgeExit)
        if(posStartBuilding){
            Memory.rooms[roomName].building=posStartBuilding
        }
    }
    // vedere o meno le info della mappa
    const posView=Memory.rooms[roomName].building
    if(posView &&visibleMapInfo){
        const visual = new RoomVisual(room.name)
        visual.text('start',posView.x,posView.y,{
            color:'black',
            backgroundColor:'white'

        })
        const tileEdgeExit:number[][]=salvoTileExit(room,visibleMapInfo)
        const costMatrix:CostMatrix= getDistanceTransform(room,visibleMapInfo)
        const posStartBuilding=choosePositionBuild(room,costMatrix,tileEdgeExit)
        const posx=posStartBuilding?.x
        const posy=posStartBuilding?.y
        if(posx && posy){
            visual.rect(posx-0.5,posy-0.5,1,1,{
            fill:'white'
            })
        }

    }





    // inizializzo roomCreeps con nome room e i ruolo a partire da 0
    roomCreeps[roomName]={harvester: 0, upgrader: 0, builder: 0,attacker: 0, defender: 0 }

    if( !Memory.rooms[roomName]){
        const spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length){
            Memory.rooms[roomName]={ spawnId: [spawns[0].id] ,building:null}
        }
    }
    const level:number=room.controller.level
    // creo oggetto per i tipi presenti nella room
    getAllCreeepsRooms(room,roomName,roomCreeps)

    manageRoom(room,level,roomName,roomCreeps,roomCreepConfig);
    break
    }
}

// ogni room avrà una strategia in base al livello del controller
function manageRoom(room: Room, level: number, roomName: string, roomCreeps: RoomCreepCounts, roomCreepConfig: RoomStrategyConfig): void {
  // console.log(`Gestisco room: ${room.name} livello ${level}`);



  switch(level){
    case 1:
        strategia1(room,roomName,roomCreeps,roomCreepConfig,level)
        break
    case 2:
        strategia1(room,roomName,roomCreeps,roomCreepConfig,level)
        break
  }
}

function getAllCreeepsRooms(room: Room, roomName: string, roomCreeps: RoomCreepCounts){
    const creepsInRoom=room.find(FIND_MY_CREEPS)
    for(let creep of creepsInRoom){
        roomCreeps[roomName][creep.memory.role]+=1

    }

}
