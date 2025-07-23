import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useToDo } from '../hooks/useToDo';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ToDo = () => {
  const user = useUser();
  const toDo = useToDo();

  const userData = useSelector((state) => state.auth.userData);

  const [task, setTask] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const handleAdd = async () => {
    if (task.trim() === '') return;
    try {
      setAddLoading(true);
      await toDo.addToDo(task);
      setTask('');
      toast.success('Task added successfully!');
    } catch (error) {
      console.log('Error adding task:', error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      setRemovingId(id);
      await toDo.removeToDo(id);
      toast.info('Task removed successfully!');
    } catch (error) {
      console.log('Error removing task:', error);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>Welcome, User: {userData ? userData.name : 'Guest'}</h1>
      
      <h2>Simple Todo App</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }} disabled={addLoading}>
          {addLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      <ul style={{ marginTop: 20, padding: 0, listStyle: 'none' }}>
        {toDo.todos.map((t, idx) => (
          <li key={t.$id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span>{t.title}</span>
            <button
              type='button'
              onClick={() => handleRemove(t.$id)}
              style={{ padding: '4px 8px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: 4 }}
              disabled={removingId === t.$id}
            >
              {removingId === t.$id ? 'Removing...' : 'Remove'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;