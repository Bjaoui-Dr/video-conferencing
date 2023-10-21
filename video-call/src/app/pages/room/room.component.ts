import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements AfterViewInit {
  @ViewChild('root')
  root!: ElementRef;
  route: ActivatedRoute = inject(ActivatedRoute);
  roomId: string = '0';

  constructor() {
    this.roomId = String(this.route.snapshot.params['roomId']);
    console.log(this.roomId);
  }
  ngAfterViewInit(): void {
    const appID = 1174494441;
    const serverSecret = '09186809166c03479ecaad8937ce66d3';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      this.roomId,
      Date.now().toString(),
      'Driss Bjaoui'
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `http://172.173.167.163:4200/room/${this.roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: 'Auto',
      showLayoutButton: true,
      showTurnOffRemoteCameraButton: false,
      showTurnOffRemoteMicrophoneButton: false,
      showRemoveUserButton: false,
    });
  }
}
