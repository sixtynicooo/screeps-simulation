import { RoomStrategyConfig } from "main";

// Oggetto di configurazione globale
export const roomCreepConfig: RoomStrategyConfig = {
    peace: {
        1: { harvester: 2, upgrader: 1, builder: 1,attacker: 0, defender: 0 },
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

// 50x50
export const ROOM_SIZE=50
