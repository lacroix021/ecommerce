import {Container, Menu, Grid, Icon, Label} from "semantic-ui-react";
import Link from "next/link";

export default function MenuWeb() {
    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className = "menu__left" width ={6}>
                        <MenuPlatforms/>
                    </Grid.Column>
                    <Grid.Column className="menu__right" width ={10}>
                        <MenuOptions />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}


function MenuPlatforms(){
    return(
        <Menu>

            <Link href="/play-Station">
                <Menu.Item as ="a">GayStation 5</Menu.Item>
            </Link>
            <Link href="/xbox">
                <Menu.Item as ="a">Xbox Guan</Menu.Item>
            </Link>
            <Link href="/switch">
                <Menu.Item as ="a">Nientiendo Switch</Menu.Item>
            </Link>
        </Menu>
    )
}

function MenuOptions(){
    return(
        <Menu>
            <Menu.Item>
            <Icon name = "user outline" />
            Mi cuenta
        </Menu.Item>
        </Menu>
    )
}