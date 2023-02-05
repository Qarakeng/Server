import { Convertions } from './entities/convertions';
import { Messages } from './entities/messages';
import { User } from './entities/Users'

const entities = [
    User,
    Messages,
    Convertions
];

export default entities;

export{
    User,
    Messages,
    Convertions
}