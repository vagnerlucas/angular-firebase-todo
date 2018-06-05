import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TaskModel, TaskModelId } from './models/TaskModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseStorage } from '@firebase/storage-types';
import { database } from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  loggedUserPicture: string;
  loggedUserName: string;

  private tasksCollection: AngularFirestoreCollection<TaskModel>;
  tasks: Observable<TaskModelId[]>;

  constructor(private readonly db: AngularFirestore, private readonly authService: AuthService) {
    this.getData();
  }

  private getData() {
    this.authService.getUser().subscribe((user) => {

      this.loggedUserPicture = user.photoURL;
      this.loggedUserName = user.displayName;

      this.tasksCollection = this.db.collection('tasks')
        .doc(user.uid).collection<TaskModel>('user-tasks');
      this.tasks = this.tasksCollection
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as TaskModel;
            const id = a.payload.doc.id;
            data.date = new Date(data.timestamp.seconds * 1000);
            return { id, ...data };
          }))
        )
    })
  }

  markDoneOrUndone(task: TaskModelId) {
    task.done = !task.done;
    this.authService.getUser().subscribe((user) => {
      this.db.collection('tasks')
        .doc(user.uid)
        .collection('user-tasks')
        .doc(task.id)
        .update({
          done: task.done
        });
    })
  }

  addTask(desc: string) {
    if (desc !== '') {
      this.authService.getUser().subscribe((user) => {

        const id = this.db.createId();
        this.db.collection('tasks')
          .doc(user.uid)
          .collection('user-tasks')
          .doc(id).set({
            done: false,
            removed: false,
            desc: desc,
            timestamp: new Date()
          });
      });
    }
  }

  removeTask(task: TaskModelId) {
    this.authService.getUser().subscribe((user) =>{
      this.db.collection('tasks').doc(user.uid).collection('user-tasks').doc(task.id).delete();
    })
  }

  signInWithGoogle() {
    return this.authService.signInWithGoogle();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.signOut();
  }
}
