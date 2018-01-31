import {Enum} from 'enumify';

class TaskState extends Enum {
}

TaskState.initEnum(['INCOMPLETE', 'COMPLETE']);

export default TaskState;
