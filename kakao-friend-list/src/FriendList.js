import { ScrollView, View } from "react-native"
import Profile from "./Profile"
import { myProfile } from "./data"
import Margin from "./Margin";

export default (props) => {
    /**
     * Case 1. 삼항 연산자 처리
     */
    // return props.isOpend? (
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     {props.data.map((item, index) => (
    //       <View key={index}>
    //         <Profile
    //           uri={item.uri}
    //           name={item.name}
    //           introduction={item.introduction}
    //             />
    //         <Margin height={17}/>
    //       </View>
    //     ))}
    //   </ScrollView>
    // ) : null;

    /**
     * Case 2. if문으로 먼저 예외처리
     */
    // if (!props.isOpend) return null;
    // return  (
    //     <ScrollView showsVerticalScrollIndicator={false}>
    //         {props.data.map((item, index) => (
    //             <View key={index}>
    //                 <Profile
    //                     uri={item.uri}
    //                     name={item.name}
    //                     introduction={item.introduction}
    //                 />
    //                 <Margin height={17} />
    //             </View>
    //         ))}
    //     </ScrollView>
    // )
    
    /**
     * Case 3. && 이용
     */
    return props.isOpend && (
        <ScrollView showsVerticalScrollIndicator={false}>
            {props.data.map((item,index) => (
                <View key= {index}>
                    <Profile
                        uri={item.uri}
                        name={item.name}
                        introduction = {item.introduction}
                    />
                    <Margin height ={17}/>
                </View>
            ))}
        </ScrollView>
    )
}