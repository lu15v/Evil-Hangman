#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <time.h>
#include <sys/mman.h>

#define BUF_SIZE 1024
#define SERVER_IP "10.48.54.39" //my own ip this must be changed accordingly to the machine
#define SERVER_PORT 60000

int main(int argc, char *argv[]){

int sock_send;
struct sockaddr_in addr_send;
int i;
char text[80], buf[BUF_SIZE];
int send_len,bytes_sent;
int toSendRecibe; //n
int pID = getpid();
static int *items;

items = mmap(NULL, sizeof *items, PROT_READ | PROT_WRITE,
                   MAP_SHARED | MAP_ANONYMOUS, -1, 0);
 *items = 0;

/*create socket for sending data */

sock_send=socket(PF_INET,SOCK_STREAM,IPPROTO_TCP);
if(sock_send<0){
	printf("Socket() failed \n");
	exit(0);
}

/*create socket address structure to connect to */

memset(&addr_send,0,sizeof(addr_send)); //clear structure
addr_send.sin_family = AF_INET ;
addr_send.sin_addr.s_addr = inet_addr(SERVER_IP);
addr_send.sin_port= htons((unsigned short) SERVER_PORT);

/* connect to the server */

i= connect(sock_send, (struct sockaddr*) &addr_send, sizeof(addr_send));

if(i<0){
	printf("Connect() failed \n");
	exit(0);
}
int max = 3;
int cL[max];
int total;

for(total = 0; total <max; total++){
	cL[total] = fork();
	if(cL[total])
		continue;
	else if(cL[total] == 0)
		break;

}
sleep(3);

while(1){
	/*send some happy data :D! */


	if(pID == getpid()){
		toSendRecibe = read(sock_send,buf, BUF_SIZE);
		if(toSendRecibe < 0)
			exit(1);
		*items = *items +1;
		printf("item created\n");
	}else{
		if(*items == 0){
			printf("buffer so empty, so... im going to sleep\n");
			sleep(2);
		}else{
			printf("consuming item by consumer.... %d\n", getpid() );
			toSendRecibe = write(sock_send,"consuming", 9);
			*items = *items -1;
			if(toSendRecibe <0)
				exit(1);
			sleep(3);
		}
	}
}
close(sock_send);
}
