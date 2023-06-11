import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AccountCreator } from 'src/app/models/base.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  posts: Post[] = [
    {
      id: '1',
      imageUrl:
        'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/349175493_279030427814960_1656189001854837653_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=QIUAyeuxc1IAX8-OALg&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBkYL43y3-JOsJsWkI_BVv50u6fSUix18a-gqxVFpf7Og&oe=648A92A0',
      title: 'Post Title 1',
      description: 'Post description or caption 1',
      likeCount: 192,
      createdAt: new Date(),
      editedAt: new Date(),
    },
    {
      id: '2',
      imageUrl:
        'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/349175493_279030427814960_1656189001854837653_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=QIUAyeuxc1IAX8-OALg&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBkYL43y3-JOsJsWkI_BVv50u6fSUix18a-gqxVFpf7Og&oe=648A92A0',
      title: 'Post Title 2',
      description:
        'Giao diện web chính thức của CARDPIE nhìn cũng keo! :> CARDPIE là ứng dụng thẻ ghi nhớ giúp người học có thể ghi nhớ lâu dài bất kỳ nội dung nào mà bản thân mong muốn nhờ tính năng "lặp lại ngắt quãng" được tích hợp sẵn trong ứng dụng. Không chỉ giới hạn trong việc học tiếng Anh, người dùng có thể tiếp cận đến hàng trăm ngôn ngữ khác: học tiếng Hàn đu Oppa, học tiếng Trung để kiếm chồng,... Còn chần chừ gì mà không tải ứng dụng keo lỳ này ngay!!',
      likeCount: 200,
      createdAt: new Date(),
      editedAt: new Date(),
    },
  ];
}
