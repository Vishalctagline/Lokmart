#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

//notification
#import <UserNotifications/UNUserNotificationCenter.h>



//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
